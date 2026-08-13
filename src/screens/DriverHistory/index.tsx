import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type DriverHistoryProps = RootStackScreenProps<"DriverHistory">;

const CheckIcon = () => (
  <Svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0C9D61" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 12.5 9.5 18 20 6.5" />
  </Svg>
);

const CarIcon = () => (
  <Svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F4531F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 11l1.2-4A2 2 0 0 1 6.1 5h11.8a2 2 0 0 1 1.9 2l1.2 4" />
    <Rect x="3" y="11" width="18" height="6" rx="2" />
    <Circle cx="7.5" cy="17.5" r="1.6" />
    <Circle cx="16.5" cy="17.5" r="1.6" />
  </Svg>
);

const NfcCardIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="2.5" width="16" height="19" rx="3" />
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

type HistoryFilter = "today" | "week" | "month";

const DriverHistory = ({ navigation }: DriverHistoryProps) => {
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>("today");

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
            <Text style={styles.statValue}>{activeFilter === "today" ? "5" : activeFilter === "week" ? "12" : "21"}</Text>
            <Text style={styles.statLabel}>Orders completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: "#0C9D61" }]}>{activeFilter === "today" ? "6:40" : activeFilter === "week" ? "7:15" : "6:40"}</Text>
            <Text style={styles.statLabel}>Avg retrieval time</Text>
          </View>
        </View>

        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          {activeFilter === "today" && (
            <>
              <Text style={styles.sectionHeader}>Afternoon</Text>

              <View style={styles.historyItem}>
                <View style={[styles.iconTile, { backgroundColor: "#E7F7EF" }]}>
                  <CheckIcon />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemPlate}>DXB Q 3345 · Blue BMW X7</Text>
                  <Text style={styles.itemDetail}>Returned · card 7112 · 5 m 48 s</Text>
                </View>
                <Text style={styles.itemTime}>15:42</Text>
              </View>

              <View style={styles.historyItem}>
                <View style={[styles.iconTile, { backgroundColor: "#FEEFE8" }]}>
                  <CarIcon />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemPlate}>DXB J 5580 · Black G63</Text>
                  <Text style={styles.itemDetail}>Parked · B-42 · card 7204 active</Text>
                </View>
                <Text style={styles.itemTime}>14:56</Text>
              </View>

              <View style={styles.historyItem}>
                <View style={[styles.iconTile, { backgroundColor: "#E7F7EF" }]}>
                  <CheckIcon />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemPlate}>DXB M 20981 · Silver Range Rover</Text>
                  <Text style={styles.itemDetail}>Returned · card 7089 · 7 m 12 s</Text>
                </View>
                <Text style={styles.itemTime}>14:18</Text>
              </View>

              <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Morning</Text>

              <View style={styles.historyItem}>
                <View style={[styles.iconTile, { backgroundColor: "#E7F7EF" }]}>
                  <CheckIcon />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemPlate}>DXB A 74126 · White Lexus LX</Text>
                  <Text style={styles.itemDetail}>Returned · card 7091 · 6 m 02 s</Text>
                </View>
                <Text style={styles.itemTime}>11:24</Text>
              </View>
            </>
          )}

          {activeFilter === "week" && (
            <>
              <View style={styles.historyItem}>
                <View style={[styles.iconTile, { backgroundColor: "#E7F7EF" }]}>
                  <CheckIcon />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemPlate}>DXB A 99012 · Black Audi Q7</Text>
                  <Text style={styles.itemDetail}>Returned · card 7105 · 8 m 20 s</Text>
                </View>
                <Text style={styles.itemTime}>Monday</Text>
              </View>

              <View style={styles.historyItem}>
                <View style={[styles.iconTile, { backgroundColor: "#E7F7EF" }]}>
                  <CheckIcon />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemPlate}>DXB B 33456 · White Toyota Camry</Text>
                  <Text style={styles.itemDetail}>Returned · card 7108 · 5 m 55 s</Text>
                </View>
                <Text style={styles.itemTime}>Tuesday</Text>
              </View>

              <View style={styles.historyItem}>
                <View style={[styles.iconTile, { backgroundColor: "#FEEFE8" }]}>
                  <CarIcon />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemPlate}>DXB C 66789 · Silver Honda CRV</Text>
                  <Text style={styles.itemDetail}>Parked · A-07 · card 7110 active</Text>
                </View>
                <Text style={styles.itemTime}>Wednesday</Text>
              </View>
            </>
          )}

          {activeFilter === "month" && (
            <>
              <View style={styles.historyItem}>
                <View style={[styles.iconTile, { backgroundColor: "#E7F7EF" }]}>
                  <CheckIcon />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemPlate}>DXB D 22345 · Red Nissan Patrol</Text>
                  <Text style={styles.itemDetail}>Returned · card 7098 · 6 m 30 s</Text>
                </View>
                <Text style={styles.itemTime}>Aug 1</Text>
              </View>

              <View style={styles.historyItem}>
                <View style={[styles.iconTile, { backgroundColor: "#E7F7EF" }]}>
                  <CheckIcon />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemPlate}>DXB E 66789 · Blue BMW 5 Series</Text>
                  <Text style={styles.itemDetail}>Returned · card 7102 · 7 m 45 s</Text>
                </View>
                <Text style={styles.itemTime}>Aug 3</Text>
              </View>
            </>
          )}
        </ScrollView>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("DriverHome")}
          >
            <HomeIcon active={false} />
            <Text style={styles.tabLabel}>Home</Text>
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

          <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
            <HistoryIcon active={true} />
            <Text style={[styles.tabLabel, styles.tabLabelActive]}>History</Text>
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
  header: {
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.3,
    color: "#1C2B46",
  },
  filterTabs: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
    paddingHorizontal: 22,
  },
  activeTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: "#1C2B46",
  },
  activeTabText: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  inactiveTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
  },
  inactiveTabText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#6C7A93",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    paddingHorizontal: 22,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAF0",
    borderRadius: 16,
    padding: 14,
    paddingLeft: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1C2B46",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6C7A93",
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 30,
    gap: 9,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#6C7A93",
    textTransform: "uppercase",
    marginTop: 4,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAF0",
    borderRadius: 15,
    padding: 12,
    paddingLeft: 15,
    gap: 12,
  },
  iconTile: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
  },
  itemPlate: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#1C2B46",
  },
  itemDetail: {
    fontSize: 11,
    fontWeight: "500",
    color: "#6C7A93",
    marginTop: 1,
  },
  itemTime: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#6C7A93",
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

export default DriverHistory;
