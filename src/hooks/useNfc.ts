import { useCallback, useEffect, useRef, useState } from "react";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

NfcManager.start();

const SCAN_DELAY_MS = 300;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function extractCardNumberFromNdef(message: unknown): string | null {
  if (!message || !Array.isArray((message as { records?: unknown[] }).records)) return null;
  const records = (message as { records: Array<{ type?: number[]; payload?: number[] }> }).records;
  for (const record of records) {
    if (!record.payload || !record.type) continue;
    const tnf = record.type[0] ?? 0;
    const typeStr = String.fromCharCode(...record.type.slice(1));
    if (tnf === 1 && typeStr === "T") {
      const langLen = record.payload[0] ?? 0;
      const textBytes = record.payload.slice(1 + langLen);
      const text = String.fromCharCode(...textBytes).trim();
      if (/^\d{4,6}$/.test(text)) return text;
    }
    if (tnf === 1 && typeStr === "text") {
      const langLen = record.payload[0] ?? 0;
      const textBytes = record.payload.slice(1 + langLen);
      const text = String.fromCharCode(...textBytes).trim();
      if (/^\d{4,6}$/.test(text)) return text;
    }
    if (tnf === 0 || tnf === 1) {
      try {
        const payloadStr = String.fromCharCode(...record.payload).trim();
        const match = payloadStr.match(/\d{4,6}/);
        if (match) return match[0];
      } catch {}
    }
  }
  return null;
}

export function useNfc() {
  const [supported, setSupported] = useState(true);
  const [reading, setReading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    NfcManager.isSupported().then((ok) => {
      if (mounted.current) setSupported(ok);
    });
    return () => {
      mounted.current = false;
    };
  }, []);

  const readTag = useCallback(async (): Promise<string | null> => {
    try {
      setReading(true);
      try {
        await NfcManager.requestTechnology([NfcTech.Ndef]);
      } catch {
        try {
          await NfcManager.requestTechnology([NfcTech.IsoDep]);
        } catch {
          try {
            await NfcManager.requestTechnology([NfcTech.NfcA]);
          } catch {
            return null;
          }
        }
      }
      const tag = await NfcManager.getTag();
      const ndefMessage = (tag as unknown as { ndefMessage?: unknown })?.ndefMessage;
      const ndefCard = extractCardNumberFromNdef(ndefMessage);
      if (ndefCard) return ndefCard;
      const rawUid = tag?.id;
      if (rawUid) {
        const cleaned = rawUid.replace(/[:\s-]/g, "");
        const numericOnly = cleaned.replace(/[^0-9]/g, "");
        if (/^\d{4,6}$/.test(numericOnly)) return numericOnly;
        const hexMatch = cleaned.match(/[0-9A-Fa-f]{8,}/);
        if (hexMatch) {
          const decimal = parseInt(hexMatch[0], 16).toString();
          if (/^\d{4,6}$/.test(decimal)) return decimal;
        }
      }
      return null;
    } catch {
      return null;
    } finally {
      await NfcManager.cancelTechnologyRequest().catch(() => {});
      if (mounted.current) setReading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      NfcManager.cancelTechnologyRequest().catch(() => {});
    };
  }, []);

  const readTagWithDelay = useCallback(async (): Promise<string | null> => {
    const uid = await readTag();
    if (!uid) await sleep(SCAN_DELAY_MS);
    return uid;
  }, [readTag]);

  return { supported, reading, readTag: readTagWithDelay };
}
