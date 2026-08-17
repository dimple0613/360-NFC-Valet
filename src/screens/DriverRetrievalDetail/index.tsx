import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { http } from "../../api/client";
import { ApiEndpoints } from "../../api/endpoints";
import { useAsyncData } from "../../hooks/useAsyncData";
import type { QueueItem } from "../../types";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type Props = RootStackScreenProps<"DriverRetrievalDetail">;

const BackIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C2B46" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 5l-7 7 7 7" />
  </Svg>
);

const CarIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1C2B46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 11l1.2-4A2 2 0 0 1 6.1 5h11.8a2 2 0 0 1 1.9 2l1.2 4" />
    <Path d="M3 11h18v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6Z" />
    <Circle cx="7.5" cy="17.5" r="1.6" />
    <Circle cx="16.5" cy="17.5" r="1.6" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0C9D61" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 12.5 9.5 18 20 6.5" />
  </Svg>
);

const TimerRing = ({ seconds }: { seconds: number }) => {
  const maxSeconds = 10 * 60;
  const progress = Math.min(Math.max(seconds, 0) / maxSeconds, 1);
  const circumference = 2 * Math.PI * 84;
  const dashoffset = circumference * (1 - progress);
  const m = Math.floor(Math.max(seconds, 0) / 60);
  const s = Math.max(seconds, 0) % 60;
  const display = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  return (
    <View style={styles.timerContainer}>
      <Svg width="190" height="190" viewBox="0 0 190 190">
        <Circle cx="95" cy="95" r="84" fill="none" stroke="#EDEFF3" strokeWidth="12" />
        <Circle
          cx="95" cy="95" r="84" fill="none" stroke="#F4531F" strokeWidth="12"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashoffset}
          transform="rotate(-90 95 95)"
        />
      </Svg>
      <View style={styles.timerTextContainer}>
        <Text style={styles.timerValue}>{display}</Text>
        <Text style={styles.timerLabel}>GUEST ARRIVES</Text>
      </View>
    </View>
  );
};

const DriverRetrievalDetail = ({ navigation, route }: Props) => {
  const { orderId } = route.params;
  const [submitting, setSubmitting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchOrder = useCallback(
    () => http.get<{ queue: QueueItem[] }>(ApiEndpoints.driver.queue),
    [],
  );
  const { data, loading } = useAsyncData<{ queue: QueueItem[] }>(fetchOrder);

  const order = data?.queue.find((q) => q.id === orderId);

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (order?.guestEta) {
      const remaining = Math.max(0, Math.floor((new Date(order.guestEta).getTime() - Date.now()) / 1000));
      setCountdown(remaining);
    }
  }, [order?.guestEta]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleArrived = async () => {
    setSubmitting(true);
    try {
      await http.patch<{ ok: boolean }>(
        ApiEndpoints.driver.orderStatus(orderId),
        { status: "returned" },
      );
      navigation.navigate("DriverHome");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed";
      Alert.alert("Error", message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={[styles.flex, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color="#F4531F" />
        </View>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={[styles.flex, { justifyContent: "center", alignItems: "center", paddingHorizontal: 40 }]}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#1C2B46", textAlign: "center" }}>Order not found</Text>
          <TouchableOpacity style={{ marginTop: 16 }} onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#F4531F" }}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.flex}>
        <MobileStatusBar />

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Retrieving</Text>
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>Card {order.cardUid ?? "?"}</Text>
          </View>
        </View>

        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          <View style={styles.timerSection}>
            <TimerRing seconds={countdown} />
          </View>

          <View style={styles.carInfoCard}>
            <View style={styles.carInfoHeader}>
              <View>
                <Text style={styles.carPlate}>{order.plate}</Text>
                <Text style={styles.carDesc}>{order.car}</Text>
              </View>
              <View style={styles.carIconTile}>
                <CarIcon size={24} />
              </View>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoCell}>
                <Text style={styles.infoCellLabel}>ZONE</Text>
                <Text style={styles.infoCellValue}>{order.zone ?? "—"}</Text>
              </View>
              <View style={styles.infoCell}>
                <Text style={styles.infoCellLabel}>SLOT</Text>
                <Text style={styles.infoCellValue}>{order.slot ?? "—"}</Text>
              </View>
              <View style={styles.infoCell}>
                <Text style={styles.infoCellLabel}>STATUS</Text>
                <Text style={styles.infoCellValue}>{order.status.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleArrived} disabled={submitting}>
            <View style={[styles.arrivedButton, submitting && { opacity: 0.7 }]}>
              {submitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.arrivedButtonText}>Car arrived — notify guest</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F6F7F9" },
  flex: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 22, paddingTop: 12 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFFFFF", borderWidth: 1.5, borderColor: "#E7EAF0", alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 15, fontWeight: "800", color: "#1C2B46" },
  cardBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, backgroundColor: "#FEEFE8" },
  cardBadgeText: { fontSize: 11, fontWeight: "800", color: "#D6430F" },
  scrollContent: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 14 },
  timerSection: { alignItems: "center", marginTop: 8 },
  timerContainer: { position: "relative", width: 190, height: 190 },
  timerTextContainer: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0, alignItems: "center", justifyContent: "center" },
  timerValue: { fontSize: 38, fontWeight: "800", letterSpacing: -1, color: "#1C2B46" },
  timerLabel: { fontSize: 11.5, fontWeight: "700", color: "#6C7A93", textTransform: "uppercase", letterSpacing: 1.2, marginTop: 2 },
  carInfoCard: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E7EAF0", borderRadius: 20, padding: 18, marginTop: 22 },
  carInfoHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  carPlate: { fontSize: 19, fontWeight: "800", letterSpacing: 0.3, color: "#1C2B46" },
  carDesc: { fontSize: 12.5, fontWeight: "600", color: "#6C7A93", marginTop: 2 },
  carIconTile: { width: 52, height: 52, borderRadius: 15, backgroundColor: "#F6F7F9", alignItems: "center", justifyContent: "center" },
  infoGrid: { flexDirection: "row", gap: 9, marginTop: 14 },
  infoCell: { flex: 1, backgroundColor: "#F6F7F9", borderRadius: 12, padding: 10, paddingLeft: 12 },
  infoCellLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 1, color: "#6C7A93", textTransform: "uppercase" },
  infoCellValue: { fontSize: 14, fontWeight: "800", marginTop: 2, color: "#1C2B46" },
  bottomButtonContainer: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 34 },
  arrivedButton: { backgroundColor: "#0C9D61", borderRadius: 99, padding: 18, alignItems: "center", shadowColor: "#0C9D61", shadowOpacity: 0.32, shadowOffset: { width: 0, height: 12 }, shadowRadius: 24, elevation: 6 },
  arrivedButtonText: { color: "#FFFFFF", fontSize: 16.5, fontWeight: "800" },
});

export default DriverRetrievalDetail;
