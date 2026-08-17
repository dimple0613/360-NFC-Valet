import React, { useCallback, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Text } from "@/theme";
import Svg, { Path, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { http } from "../../api/client";
import { ApiEndpoints } from "../../api/endpoints";
import { useAsyncData } from "../../hooks/useAsyncData";
import type { QueueItem } from "../../types";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type Props = RootStackScreenProps<"DriverPickupRequests">;
type FilterTab = "active" | "to_park" | "done";

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
  <Svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={active ? "#F4531F" : "#9AA6BC"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

const DriverPickupRequests = ({ navigation }: Props) => {
  const { driver } = useAuth();
  const [activeTab, setActiveTab] = useState<FilterTab>("active");
  const fetchQueue = useCallback(
    () => http.get<{ queue: QueueItem[] }>(ApiEndpoints.driver.queue),
    [],
  );
  const { data, loading, reload } = useAsyncData<{ queue: QueueItem[] }>(fetchQueue);

  const allItems = data?.queue ?? [];
  const activeItems = allItems.filter((i) => i.status === "returning" || i.status === "retrieving");
  const toParkItems = allItems.filter((i) => i.status === "active");
  const doneItems = allItems.filter((i) => i.status === "returned" || i.status === "parked");

  const displayedItems = activeTab === "active" ? activeItems : activeTab === "to_park" ? toParkItems : doneItems;

  const handleAcceptReturn = async (item: QueueItem) => {
    try {
      await http.patch<{ ok: boolean }>(
        ApiEndpoints.driver.orderStatus(item.id),
        { status: "retrieving" },
      );
      reload();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed";
      Alert.alert("Error", message);
    }
  };

  const handleMarkReturned = async (item: QueueItem) => {
    try {
      await http.patch<{ ok: boolean }>(
        ApiEndpoints.driver.orderStatus(item.id),
        { status: "returned" },
      );
      reload();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed";
      Alert.alert("Error", message);
    }
  };

  const formatEta = (eta: string | null) => {
    if (!eta) return null;
    return new Date(eta).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.flex}>
        <MobileStatusBar />

        <View style={styles.header}>
          <Text style={styles.title}>Requests</Text>
        </View>

        <View style={styles.filterTabs}>
          <TouchableOpacity
            style={activeTab === "active" ? styles.activeTab : styles.inactiveTab}
            activeOpacity={0.7}
            onPress={() => setActiveTab("active")}
          >
            <Text style={activeTab === "active" ? styles.activeTabText : styles.inactiveTabText}>
              Active · {activeItems.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === "to_park" ? styles.activeTab : styles.inactiveTab}
            activeOpacity={0.7}
            onPress={() => setActiveTab("to_park")}
          >
            <Text style={activeTab === "to_park" ? styles.activeTabText : styles.inactiveTabText}>
              To park · {toParkItems.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === "done" ? styles.activeTab : styles.inactiveTab}
            activeOpacity={0.7}
            onPress={() => setActiveTab("done")}
          >
            <Text style={activeTab === "done" ? styles.activeTabText : styles.inactiveTabText}>
              Done · {doneItems.length}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          {loading ? (
            <ActivityIndicator size="small" color="#F4531F" style={{ marginTop: 24 }} />
          ) : displayedItems.length === 0 ? (
            <Text style={styles.emptyText}>No items</Text>
          ) : (
            displayedItems.map((item) => {
              const isReturning = item.status === "returning";
              const isRetrieving = item.status === "retrieving";
              const eta = formatEta(item.guestEta);
              return (
                <View
                  key={item.id}
                  style={[styles.card, isReturning && styles.cardHighlighted]}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.plateText}>{item.plate}</Text>
                    {item.isMine ? (
                      <View style={styles.mineBadge}>
                        <Text style={styles.mineBadgeText}>MINE</Text>
                      </View>
                    ) : isReturning ? (
                      <View style={styles.queuedBadge}>
                        <Text style={styles.queuedBadgeText}>RETURN</Text>
                      </View>
                    ) : item.status === "active" ? (
                      <View style={styles.parkBadge}>
                        <Text style={styles.parkBadgeText}>TO PARK</Text>
                      </View>
                    ) : (
                      <View style={styles.doneBadge}>
                        <Text style={styles.doneBadgeText}>{item.status.toUpperCase()}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.carDesc}>
                    {item.car} · Zone {item.zone ?? "?"} · {item.slot ?? "?"}
                  </Text>
                  {eta && (
                    <View style={styles.etaRow}>
                      <Text style={styles.etaLabel}>Guest ETA</Text>
                      <Text style={[styles.etaValue, { color: "#B97B17" }]}>{eta}</Text>
                    </View>
                  )}
                  {activeTab === "active" && isReturning && !item.isMine && (
                    <TouchableOpacity
                      style={styles.acceptButton}
                      activeOpacity={0.8}
                      onPress={() => handleAcceptReturn(item)}
                    >
                      <Text style={styles.acceptButtonText}>Accept retrieval</Text>
                    </TouchableOpacity>
                  )}
                  {activeTab === "active" && item.isMine && (
                    <TouchableOpacity
                      style={styles.completeButton}
                      activeOpacity={0.8}
                      onPress={() => handleMarkReturned(item)}
                    >
                      <Text style={styles.completeButtonText}>Mark as returned</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => navigation.navigate("DriverHome")}>
            <HomeIcon active={false} />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
            <RequestsIcon active={true} />
            <Text style={[styles.tabLabel, styles.tabLabelActive]}>Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nfcTabButton} activeOpacity={0.8} onPress={() => navigation.navigate("DriverNfcTap")}>
            <NfcCardIcon size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => navigation.navigate("DriverHistory")}>
            <HistoryIcon active={false} />
            <Text style={styles.tabLabel}>History</Text>
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
  scrollContent: { paddingHorizontal: 22, paddingTop: 16, gap: 11, paddingBottom: 16 },
  emptyText: { fontSize: 13, fontWeight: "600", color: "#6C7A93", textAlign: "center", marginTop: 24 },
  card: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E7EAF0", borderRadius: 18, padding: 15, paddingLeft: 16, paddingRight: 16 },
  cardHighlighted: { borderWidth: 1.5, borderColor: "#F4531F", shadowColor: "#F4531F", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 8 }, shadowRadius: 20, elevation: 4 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  plateText: { fontSize: 15.5, fontWeight: "800", color: "#1C2B46" },
  mineBadge: { paddingHorizontal: 11, paddingVertical: 5, borderRadius: 99, backgroundColor: "#FEEFE8" },
  mineBadgeText: { fontSize: 10.5, fontWeight: "800", color: "#D6430F" },
  queuedBadge: { paddingHorizontal: 11, paddingVertical: 5, borderRadius: 99, backgroundColor: "#FDF3E3" },
  queuedBadgeText: { fontSize: 10.5, fontWeight: "800", color: "#B97B17" },
  parkBadge: { paddingHorizontal: 11, paddingVertical: 5, borderRadius: 99, backgroundColor: "#FEEFE8" },
  parkBadgeText: { fontSize: 10.5, fontWeight: "800", color: "#D6430F" },
  doneBadge: { paddingHorizontal: 11, paddingVertical: 5, borderRadius: 99, backgroundColor: "#E7F7EF" },
  doneBadgeText: { fontSize: 10.5, fontWeight: "800", color: "#0C9D61" },
  carDesc: { fontSize: 12, fontWeight: "600", color: "#6C7A93", marginTop: 2 },
  etaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  etaLabel: { fontSize: 12, fontWeight: "600", color: "#6C7A93" },
  etaValue: { fontSize: 16, fontWeight: "800" },
  acceptButton: { marginTop: 12, padding: 12, borderRadius: 99, backgroundColor: "#F4531F", alignItems: "center" },
  acceptButtonText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  completeButton: { marginTop: 12, padding: 12, borderRadius: 99, backgroundColor: "#0C9D61", alignItems: "center" },
  completeButtonText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  tabBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#E7EAF0", paddingHorizontal: 30, paddingTop: 12, paddingBottom: 26 },
  tabItem: { alignItems: "center", gap: 3 },
  tabLabel: { fontSize: 10, fontWeight: "700", color: "#9AA6BC" },
  tabLabelActive: { fontWeight: "800", color: "#F4531F" },
  nfcTabButton: { width: 54, height: 54, borderRadius: 27, backgroundColor: "#F4531F", alignItems: "center", justifyContent: "center", marginTop: -30, borderWidth: 4, borderColor: "#F6F7F9", shadowColor: "#F4531F", shadowOpacity: 0.35, shadowOffset: { width: 0, height: 10 }, shadowRadius: 20, elevation: 8 },
});

export default DriverPickupRequests;
