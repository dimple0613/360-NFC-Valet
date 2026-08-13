import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type DriverHomeProps = RootStackScreenProps<"DriverHome">;

const ClockIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B97B17" strokeWidth="2" strokeLinecap="round">
    <Circle cx="12" cy="12" r="9" />
    <Path d="M12 7v5l3 2" />
  </Svg>
);

const CarIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4531F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 11l1.2-4A2 2 0 0 1 6.1 5h11.8a2 2 0 0 1 1.9 2l1.2 4" />
    <Rect x="3" y="11" width="18" height="6" rx="2" />
    <Circle cx="7.5" cy="17.5" r="1.6" />
    <Circle cx="16.5" cy="17.5" r="1.6" />
  </Svg>
);

const NfcCardIcon = ({ size = 26 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="2.5" width="16" height="19" rx="3" />
    <Path d="M9.5 9.5a4.2 4.2 0 0 1 5 0" />
    <Path d="M8 7a7 7 0 0 1 8 0" />
    <Circle cx="12" cy="13.5" r="1.4" fill="#fff" stroke="none" />
  </Svg>
);

const BellIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C2B46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <Path d="M10.3 21a2 2 0 0 0 3.4 0" />
  </Svg>
);

const ChevronRight = ({ color = "#fff", size = 20 }: { color?: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 5l7 7-7 7" />
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

const DriverHome = ({ navigation }: DriverHomeProps) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.flex}>
        <MobileStatusBar />

        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>RK</Text>
              </View>
              <View>
                <Text style={styles.driverName}>Ramesh K.</Text>
                <Text style={styles.driverStatus}>● On shift · JW Marriott Marquis</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7} onPress={() => navigation.navigate("DriverReturnRequest")}>
              <BellIcon />
              <View style={styles.bellBadge} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>Parked today</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: "#E9A23B" }]}>3</Text>
              <Text style={styles.statLabel}>Returns pending</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: "#0C9D61" }]}>6:40</Text>
              <Text style={styles.statLabel}>Avg return</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("DriverNfcTap")}
            activeOpacity={0.8}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={["#F4531F", "#FF8A50"]}
              style={styles.nfcCard}
            >
              <View style={styles.nfcIconTile}>
                <NfcCardIcon size={26} />
              </View>
              <View style={styles.nfcTextContainer}>
                <Text style={styles.nfcTitle}>Tap NFC card</Text>
                <Text style={styles.nfcSubtitle}>New arrival — activate a card in seconds</Text>
              </View>
              <ChevronRight />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.queueHeader}>
            <Text style={styles.queueTitle}>Live queue</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("DriverPickupRequests")}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.queueList}>
            <TouchableOpacity
              style={styles.queueItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("DriverPickupRequests")}
            >
              <View style={[styles.queueIconTile, { backgroundColor: "#FDF3E3" }]}>
                <ClockIcon />
              </View>
              <View style={styles.queueItemInfo}>
                <Text style={styles.queueItemPlate}>DXB A 74126 · White Lexus LX</Text>
                <Text style={styles.queueItemDetail}>Return request · Zone B · Slot 42</Text>
              </View>
              <View style={styles.queueItemTimer}>
                <Text style={[styles.queueItemTime, { color: "#B97B17" }]}>08:32</Text>
                <Text style={styles.queueItemTimeLabel}>to arrive</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.queueItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("DriverPickupRequests")}
            >
              <View style={[styles.queueIconTile, { backgroundColor: "#FEEFE8" }]}>
                <CarIcon />
              </View>
              <View style={styles.queueItemInfo}>
                <Text style={styles.queueItemPlate}>DXB J 5580 · Black G63</Text>
                <Text style={styles.queueItemDetail}>To park · card 7204 active</Text>
              </View>
              <View style={styles.parkBadge}>
                <Text style={styles.parkBadgeText}>Park</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
            <HomeIcon active={true} />
            <Text style={[styles.tabLabel, styles.tabLabelActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("DriverPickupRequests")}
          >
            <RequestsIcon active={false} />
            <Text style={styles.tabLabel}>Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nfcTabButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverNfcTap")}
          >
            <NfcCardIcon size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("DriverHistory")}
          >
            <HistoryIcon active={false} />
            <Text style={styles.tabLabel}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("DriverProfile")}
          >
            <ProfileIcon active={false} />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F7F9",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    gap: 11,
    alignItems: "center",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1C2B46",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  driverName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1C2B46",
  },
  driverStatus: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#0C9D61",
    marginTop: 1,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
    alignItems: "center",
    justifyContent: "center",
  },
  bellBadge: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#F4531F",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAF0",
    borderRadius: 16,
    padding: 13,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1C2B46",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6C7A93",
    marginTop: 1,
  },
  nfcCard: {
    marginTop: 18,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    shadowColor: "#F4531F",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 26,
    elevation: 8,
  },
  nfcIconTile: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  nfcTextContainer: {
    flex: 1,
  },
  nfcTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  nfcSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255,255,255,0.85)",
    marginTop: 2,
  },
  queueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 20,
  },
  queueTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1C2B46",
  },
  viewAll: {
    fontSize: 12,
    fontWeight: "700",
    color: "#F4531F",
  },
  queueList: {
    gap: 10,
    marginTop: 12,
    paddingBottom: 16,
  },
  queueItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAF0",
    borderRadius: 16,
    padding: 13,
    gap: 12,
  },
  queueIconTile: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  queueItemInfo: {
    flex: 1,
  },
  queueItemPlate: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1C2B46",
  },
  queueItemDetail: {
    fontSize: 11.5,
    fontWeight: "500",
    color: "#6C7A93",
    marginTop: 1,
  },
  queueItemTimer: {
    alignItems: "flex-end",
  },
  queueItemTime: {
    fontSize: 15,
    fontWeight: "800",
  },
  queueItemTimeLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#6C7A93",
  },
  parkBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: "#FEEFE8",
  },
  parkBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#D6430F",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E7EAF0",
    paddingHorizontal: 30,
    paddingTop: 12,
    paddingBottom: 26,
  },
  tabItem: {
    alignItems: "center",
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9AA6BC",
  },
  tabLabelActive: {
    fontWeight: "800",
    color: "#F4531F",
  },
  nfcTabButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F4531F",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    borderWidth: 4,
    borderColor: "#F6F7F9",
    shadowColor: "#F4531F",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 8,
  },
});

export default DriverHome;
