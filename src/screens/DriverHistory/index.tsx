import React, { useCallback, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Text } from "@/theme";
import Svg, { Path, Circle } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { http } from "../../api/client";
import { ApiEndpoints } from "../../api/endpoints";
import { useAsyncData } from "../../hooks/useAsyncData";
import type { HistoryItem } from "../../types";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type Props = RootStackScreenProps<"DriverHistory">;
type HistoryFilter = "today" | "week" | "month";

const CheckIcon = () => (
  <Svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0C9D61" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 12.5 9.5 18 20 6.5" />
  </Svg>
);

const CarIcon = () => (
  <Svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F4531F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 11l1.2-4A2 2 0 0 1 6.1 5h11.8a2 2 0 0 1 1.9 2l1.2 4" />
    <Path d="M3 11h18v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6Z" />
    <Circle cx="7.5" cy="17.5" r="1.6" />
    <Circle cx="16.5" cy="17.5" r="1.6" />
  </Svg>
);

const NfcCardIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 2.5h12a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H4" />
    <Path d="M9.5 9.5a4.2 4.2 0 0 1 5 0" />
    <Path d="M8 7a7 7 0 0 1 8 0" />
    <Circle cx="12" cy="13.5" r="1.4" fill="#fff" stroke="none" />
  </Svg>
);

const HomeIcon = ({ active }: { active: boolean }) => (
  <Svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={active ? "#F4531F" : "#9AA6BC"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 10.5 12 3l9 7.5" />
    <Path d="M5 9.5V21h14V9.5" />
  </Svg>
);

const RequestsIcon = ({ active }: { active: boolean }) => (
  <Svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={active ? "#F4531F" : "#9AA6BC"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 6h16M4 12h16M4 18h10" />
  </Svg>
);

const HistoryIcon = ({ active }: { active: boolean }) => (
  <Svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={active ? "#F4531F" : "#9AA6BC"} strokeWidth="2" strokeLinecap="round">
    <Circle cx="12" cy="12" r="9" />
    <Path d="M12 7v5l3 2" />
  </Svg>
);

const ProfileIcon = ({ active }: { active: boolean }) => (
  <Svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={active ? "#F4531F" : "#9AA6BC"} strokeWidth="2" strokeLinecap="round">
    <Circle cx="12" cy="8" r="3.6" />
    <Path d="M5 20a7 7 0 0 1 14 0" />
  </Svg>
);

const formatDuration = (seconds: number | null) => {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

const DriverHistory = ({ navigation }: Props) => {
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>("today");
  const fetchHistory = useCallback(
    () => http.get<{ stats: { total: number; avgReturnMin: number }; history: HistoryItem[] }>(
      `${ApiEndpoints.driver.history}?period=${activeFilter === "today" ? "day" : activeFilter === "week" ? "week" : "month"}`,
    ),
    [activeFilter],
  );
  const { data, loading, error, reload } = useAsyncData<{ stats: { total: number; avgReturnMin: number }; history: HistoryItem[] }>(fetchHistory);

  const stats = data?.stats;
  const history = data?.history ?? [];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.flex}>
        <MobileStatusBar />

        <View style={styles.header}>
          <Text style={styles.title}>My history</Text>
        </View>

        <View style={styles.filterTabs}>
          <TouchableOpacity
            style={activeFilter === "today" ? styles.activeTab : styles.inactiveTab}
            activeOpacity={0.7}
            onPress={() => setActiveFilter("today")}
          >
            <Text style={activeFilter === "today" ? styles.activeTabText : styles.inactiveTabText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeFilter === "week" ? styles.activeTab : styles.inactiveTab}
            activeOpacity={0.7}
            onPress={() => setActiveFilter("week")}
          >
            <Text style={activeFilter === "week" ? styles.activeTabText : styles.inactiveTabText}>This week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeFilter === "month" ? styles.activeTab : styles.inactiveTab}
            activeOpacity={0.7}
            onPress={() => setActiveFilter("month")}
          >
            <Text style={activeFilter === "month" ? styles.activeTabText : styles.inactiveTabText}>Month</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{loading ? "—" : stats?.total ?? 0}</Text>
            <Text style={styles.statLabel}>Orders completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: "#0C9D61" }]}>{loading ? "—" : `${stats?.avgReturnMin ?? 0}:00`}</Text>
            <Text style={styles.statLabel}>Avg retrieval time</Text>
          </View>
        </View>

        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          {loading ? (
            <ActivityIndicator size="small" color="#F4531F" style={{ marginTop: 24 }} />
          ) : error ? (
            <TouchableOpacity onPress={reload} activeOpacity={0.7}>
              <Text style={[styles.emptyText, { color: "#F4531F" }]}>Failed to load — tap to retry</Text>
            </TouchableOpacity>
          ) : history.length === 0 ? (
            <Text style={styles.emptyText}>No history yet</Text>
          ) : (
            history.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <View style={[styles.iconTile, { backgroundColor: "#E7F7EF" }]}>
                  <CheckIcon />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemPlate}>{item.plate} · {item.car}</Text>
                  <Text style={styles.itemDetail}>
                    Returned · {formatDuration(item.durationSeconds)}
                  </Text>
                </View>
                <Text style={styles.itemTime}>
                  {item.returnedAt
                    ? new Date(item.returnedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
                    : "—"}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => navigation.navigate("DriverHome")}>
            <HomeIcon active={false} />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => navigation.navigate("DriverPickupRequests")}>
            <RequestsIcon active={false} />
            <Text style={styles.tabLabel}>Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nfcTabButton} activeOpacity={0.8} onPress={() => navigation.navigate("DriverNfcTap")}>
            <NfcCardIcon size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
            <HistoryIcon active={true} />
            <Text style={[styles.tabLabel, styles.tabLabelActive]}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => navigation.navigate("DriverProfile")}>
            <ProfileIcon active={false} />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F6F7F9" },
  flex: { flex: 1 },
  header: { paddingHorizontal: 22, paddingTop: 12 },
  title: { fontSize: 22, fontWeight: "800", letterSpacing: -0.3, color: "#1C2B46" },
  filterTabs: { flexDirection: "row", gap: 8, marginTop: 14, paddingHorizontal: 22 },
  activeTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 99, backgroundColor: "#1C2B46" },
  activeTabText: { fontSize: 12.5, fontWeight: "800", color: "#FFFFFF" },
  inactiveTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 99, backgroundColor: "#FFFFFF", borderWidth: 1.5, borderColor: "#E7EAF0" },
  inactiveTabText: { fontSize: 12.5, fontWeight: "700", color: "#6C7A93" },
  statsGrid: { flexDirection: "row", gap: 10, marginTop: 14, paddingHorizontal: 22 },
  statCard: { flex: 1, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E7EAF0", borderRadius: 16, padding: 14, paddingLeft: 16 },
  statValue: { fontSize: 24, fontWeight: "800", color: "#1C2B46" },
  statLabel: { fontSize: 11, fontWeight: "600", color: "#6C7A93", marginTop: 2 },
  scrollContent: { paddingHorizontal: 22, paddingTop: 16, paddingBottom: 30, gap: 9 },
  emptyText: { fontSize: 13, fontWeight: "600", color: "#6C7A93", textAlign: "center", marginTop: 24 },
  historyItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E7EAF0", borderRadius: 15, padding: 12, paddingLeft: 15, gap: 12 },
  iconTile: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  itemInfo: { flex: 1 },
  itemPlate: { fontSize: 13.5, fontWeight: "800", color: "#1C2B46" },
  itemDetail: { fontSize: 11, fontWeight: "500", color: "#6C7A93", marginTop: 1 },
  itemTime: { fontSize: 11.5, fontWeight: "700", color: "#6C7A93" },
  tabBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#E7EAF0", paddingHorizontal: 30, paddingTop: 12, paddingBottom: 26 },
  tabItem: { alignItems: "center", gap: 3 },
  tabLabel: { fontSize: 10, fontWeight: "700", color: "#9AA6BC" },
  tabLabelActive: { fontWeight: "800", color: "#F4531F" },
  nfcTabButton: { width: 54, height: 54, borderRadius: 27, backgroundColor: "#F4531F", alignItems: "center", justifyContent: "center", marginTop: -30, borderWidth: 4, borderColor: "#F6F7F9", shadowColor: "#F4531F", shadowOpacity: 0.35, shadowOffset: { width: 0, height: 10 }, shadowRadius: 20, elevation: 8 },
});

export default DriverHistory;
