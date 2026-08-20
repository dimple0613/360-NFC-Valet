import { useCallback, useEffect, useRef, useState } from "react";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

NfcManager.start();

const SCAN_DELAY_MS = 300;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type NdefRecordLike = {
  tnf?: number;
  type?: number[];
  payload?: number[];
};

function extractCardNumberFromNdef(message: unknown): string | null {
  if (!message || !Array.isArray((message as { records?: unknown[] }).records)) return null;
  const records = (message as { records: NdefRecordLike[] }).records;
  for (const record of records) {
    if (!record.payload) continue;
    const tnf = record.tnf ?? record.type?.[0] ?? 0;
    const typeStr = record.type ? String.fromCharCode(...record.type) : "";
    if (tnf === 1 && (typeStr === "T" || typeStr === "text")) {
      const langLen = (record.payload[0] ?? 0) & 0x3f;
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
      console.log("[NFC] Tag", JSON.stringify(tag));
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

  const writeCard = useCallback(async (number: string): Promise<boolean> => {
    try {
      setReading(true);
      await NfcManager.requestTechnology([NfcTech.Ndef]);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(number)]);
      await NfcManager.ndefHandler.writeNdefMessage(bytes, { reconnectAfterWrite: false });
      return true;
    } catch (err) {
      console.log("[NFC] Write failed", err);
      return false;
    } finally {
      await NfcManager.cancelTechnologyRequest().catch(() => {});
      if (mounted.current) setReading(false);
    }
  }, []);

  return { supported, reading, readTag: readTagWithDelay, writeCard };
}
