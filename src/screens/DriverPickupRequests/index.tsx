import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type DriverPickupRequestsProps = RootStackScreenProps<"DriverPickupRequests">;

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

type FilterTab = "active" | "to_park" | "done";

const DriverPickupRequests = ({ navigation }: DriverPickupRequestsProps) => {
  const [activeTab, setActiveTab] = useState<FilterTab>("active");

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
            <Text style={activeTab === "active" ? styles.activeTabText : styles.inactiveTabText}>Active · 3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === "to_park" ? styles.activeTab : styles.inactiveTab}
            activeOpacity={0.7}
            onPress={() => setActiveTab("to_park")}
          >
            <Text style={activeTab === "to_park" ? styles.activeTabText : styles.inactiveTabText}>To park · 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === "done" ? styles.activeTab : styles.inactiveTab}
            activeOpacity={0.7}
            onPress={() => setActiveTab("done")}
          >
            <Text style={activeTab === "done" ? styles.activeTabText : styles.inactiveTabText}>Done · 18</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          {activeTab === "active" && (
            <>
              <TouchableOpacity
                style={styles.cardActive}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("DriverRetrievalDetail")}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.plateText}>DXB · A 74126</Text>
                  <View style={styles.mineBadge}>
                    <Text style={styles.mineBadgeText}>MINE · RETRIEVING</Text>
                  </View>
                </View>
                <Text style={styles.carDesc}>White Lexus LX 600 · Zone B · B-42</Text>
                <View style={styles.etaRow}>
                  <Text style={styles.etaLabel}>Guest ETA</Text>
                  <Text style={[styles.etaValue, { color: "#B97B17" }]}>08:32</Text>
                </View>
                <View style={styles.progressBar}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["#E9A23B", "#F4531F"]}
                    style={[styles.progressFill, { width: "62%" }]}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.cardNormal}>
                <View style={styles.cardHeader}>
                  <Text style={styles.plateText}>DXB · M 20981</Text>
                  <View style={styles.queuedBadge}>
                    <Text style={styles.queuedBadgeText}>QUEUED · OMAR</Text>
                  </View>
                </View>
                <Text style={styles.carDesc}>Silver Range Rover · Zone A · A-07</Text>
                <View style={styles.etaRow}>
                  <Text style={styles.etaLabel}>Guest ETA</Text>
                  <Text style={[styles.etaValue, { color: "#0C9D61" }]}>16:10</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFillGreen, { width: "30%" }]} />
                </View>
              </View>

              <View style={styles.cardNormal}>
                <View style={styles.cardHeader}>
                  <Text style={styles.plateText}>DXB · Q 3345</Text>
                  <View style={styles.overdueBadge}>
                    <Text style={styles.overdueBadgeText}>OVERDUE · 2 MIN</Text>
                  </View>
                </View>
                <Text style={styles.carDesc}>Blue BMW X7 · Basement · P2-18</Text>
                <View style={styles.etaRow}>
                  <Text style={styles.etaLabel}>Guest waiting at curb</Text>
                  <Text style={[styles.etaValue, { color: "#E23D3D" }]}>-02:04</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFillRed, { width: "100%" }]} />
                </View>
              </View>
            </>
          )}

          {activeTab === "to_park" && (
            <View style={styles.cardNormal}>
              <View style={styles.cardHeader}>
                <Text style={styles.plateText}>DXB · B 12345</Text>
                <View style={styles.queuedBadge}>
                  <Text style={styles.queuedBadgeText}>TO PARK</Text>
                </View>
              </View>
              <Text style={styles.carDesc}>Silver BMW 7 · Zone C · C-07</Text>
              <View style={styles.etaRow}>
                <Text style={styles.etaLabel}>Card 7206 active</Text>
                <Text style={[styles.etaValue, { color: "#6C7A93" }]}>Ready</Text>
              </View>
            </View>
          )}

          {activeTab === "done" && (
            <>
              <View style={styles.cardNormal}>
                <View style={styles.cardHeader}>
                  <Text style={styles.plateText}>DXB · C 99887</Text>
                  <View style={{ paddingHorizontal: 11, paddingVertical: 5, borderRadius: 99, backgroundColor: "#E7F7EF" }}>
                    <Text style={{ fontSize: 10.5, fontWeight: "800", color: "#0C9D61" }}>DONE</Text>
                  </View>
                </View>
                <Text style={styles.carDesc}>Red Ferrari F8 · Zone A · A-03</Text>
                <View style={styles.etaRow}>
                  <Text style={styles.etaLabel}>Completed</Text>
                  <Text style={[styles.etaValue, { color: "#0C9D61" }]}>5:48</Text>
                </View>
              </View>

              <View style={styles.cardNormal}>
                <View style={styles.cardHeader}>
                  <Text style={styles.plateText}>DXB · D 55667</Text>
                  <View style={{ paddingHorizontal: 11, paddingVertical: 5, borderRadius: 99, backgroundColor: "#E7F7EF" }}>
                    <Text style={{ fontSize: 10.5, fontWeight: "800", color: "#0C9D61" }}>DONE</Text>
                  </View>
                </View>
                <Text style={styles.carDesc}>White Mercedes S · Zone B · B-15</Text>
                <View style={styles.etaRow}>
                  <Text style={styles.etaLabel}>Completed</Text>
                  <Text style={[styles.etaValue, { color: "#0C9D61" }]}>7:12</Text>
                </View>
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

          <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
            <RequestsIcon active={true} />
            <Text style={[styles.tabLabel, styles.tabLabelActive]}>Requests</Text>
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
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    gap: 11,
    paddingBottom: 16,
  },
  cardActive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#F4531F",
    borderRadius: 18,
    padding: 15,
    paddingLeft: 16,
    paddingRight: 16,
    shadowColor: "#F4531F",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 4,
  },
  cardNormal: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAF0",
    borderRadius: 18,
    padding: 15,
    paddingLeft: 16,
    paddingRight: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plateText: {
    fontSize: 15.5,
    fontWeight: "800",
    color: "#1C2B46",
  },
  mineBadge: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: "#FEEFE8",
  },
  mineBadgeText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#D6430F",
  },
  queuedBadge: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: "#FDF3E3",
  },
  queuedBadgeText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#B97B17",
  },
  overdueBadge: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: "#FDEBEB",
  },
  overdueBadgeText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#E23D3D",
  },
  carDesc: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6C7A93",
    marginTop: 2,
  },
  etaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  etaLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6C7A93",
  },
  etaValue: {
    fontSize: 16,
    fontWeight: "800",
  },
  progressBar: {
    height: 7,
    borderRadius: 99,
    backgroundColor: "#F1F3F6",
    marginTop: 7,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
  },
  progressFillGreen: {
    height: "100%",
    borderRadius: 99,
    backgroundColor: "#0C9D61",
  },
  progressFillRed: {
    height: "100%",
    borderRadius: 99,
    backgroundColor: "#E23D3D",
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

export default DriverPickupRequests;
