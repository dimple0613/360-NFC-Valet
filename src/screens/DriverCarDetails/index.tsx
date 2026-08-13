import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type DriverCarDetailsProps = RootStackScreenProps<"DriverCarDetails">;

const BackIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C2B46" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 5l-7 7 7 7" />
  </Svg>
);

const SmallNfcIcon = () => (
  <Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FF8A50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="2.5" width="16" height="19" rx="3" />
    <Path d="M9.5 9.5a4.2 4.2 0 0 1 5 0" />
    <Path d="M8 7a7 7 0 0 1 8 0" />
    <Circle cx="12" cy="13.5" r="1.4" fill="#FF8A50" stroke="none" />
  </Svg>
);

const PlateCameraIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F4531F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
    <Circle cx="12" cy="13.5" r="3.4" />
  </Svg>
);

const COLORS = [
  { id: "1", bg: "#16181C" },
  { id: "2", bg: "#FFFFFF", border: "#E7EAF0" },
  { id: "3", bg: "#C7CCD6" },
  { id: "4", bg: "#7A8699" },
];

const DriverCarDetails = ({ navigation }: DriverCarDetailsProps) => {
  const [selectedColor, setSelectedColor] = useState("1");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.flex}>
        <MobileStatusBar />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Car details</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Card read ✓</Text>
          </View>
        </View>

        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          <View style={styles.uidCard}>
            <View>
              <Text style={styles.uidLabel}>CARD UID — PRINTED ON CARD</Text>
              <View style={styles.uidDigits}>
                <View style={styles.digitBox}>
                  <Text style={styles.digitText}>7</Text>
                </View>
                <View style={styles.digitBox}>
                  <Text style={styles.digitText}>2</Text>
                </View>
                <View style={styles.digitBox}>
                  <Text style={styles.digitText}>0</Text>
                </View>
                <View style={[styles.digitBox, styles.digitBoxActive]}>
                  <Text style={styles.digitText}>4</Text>
                </View>
              </View>
            </View>
            <SmallNfcIcon />
          </View>

          <View style={styles.plateCard}>
            <View>
              <Text style={styles.plateLabel}>PLATE NUMBER</Text>
              <Text style={styles.plateText}>DXB · J 5580</Text>
            </View>
            <View style={styles.plateIconTile}>
              <PlateCameraIcon />
            </View>
          </View>

          <Text style={styles.hintText}>Or snap the plate — we read it for you.</Text>

          <View style={styles.makeModelGrid}>
            <View style={styles.makeModelCard}>
              <Text style={styles.fieldLabel}>MAKE</Text>
              <Text style={styles.fieldValue}>Mercedes</Text>
            </View>
            <View style={styles.makeModelCard}>
              <Text style={styles.fieldLabel}>MODEL</Text>
              <Text style={styles.fieldValue}>G63 AMG</Text>
            </View>
          </View>

          <View style={styles.colorCard}>
            <Text style={styles.fieldLabel}>COLOR</Text>
            <View style={styles.colorSwatches}>
              {COLORS.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  onPress={() => setSelectedColor(color.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: color.bg },
                      color.border ? { borderWidth: 1.5, borderColor: color.border } : { borderWidth: 3, borderColor: "#E7EAF0" },
                      selectedColor === color.id && { borderColor: "#F4531F", borderWidth: 3 },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverCardActivated")}
          >
            <View style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Confirm & park</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1C2B46",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: "#E7F7EF",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0C9D61",
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12,
  },
  uidCard: {
    backgroundColor: "#1C2B46",
    borderRadius: 18,
    padding: 15,
    paddingRight: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  uidLabel: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#9FB0CC",
    textTransform: "uppercase",
  },
  uidDigits: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  digitBox: {
    width: 40,
    height: 48,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  digitBoxActive: {
    borderWidth: 2,
    borderColor: "#F4531F",
  },
  digitText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  plateCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
    borderRadius: 16,
    padding: 13,
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plateLabel: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#6C7A93",
    textTransform: "uppercase",
  },
  plateText: {
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginTop: 3,
    color: "#1C2B46",
  },
  plateIconTile: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FEEFE8",
    alignItems: "center",
    justifyContent: "center",
  },
  hintText: {
    fontSize: 11,
    color: "#6C7A93",
    fontWeight: "600",
    marginTop: -6,
    paddingLeft: 4,
  },
  makeModelGrid: {
    flexDirection: "row",
    gap: 12,
  },
  makeModelCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
    borderRadius: 16,
    padding: 13,
    paddingLeft: 16,
  },
  fieldLabel: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#6C7A93",
    textTransform: "uppercase",
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 3,
    color: "#1C2B46",
  },
  colorCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
    borderRadius: 16,
    padding: 13,
    paddingLeft: 16,
  },
  colorSwatches: {
    flexDirection: "row",
    gap: 9,
    marginTop: 9,
    alignItems: "center",
  },
  colorSwatch: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  nextButton: {
    backgroundColor: "#F4531F",
    borderRadius: 99,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});

export default DriverCarDetails;
