import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type DriverCardActivatedProps = RootStackScreenProps<"DriverCardActivated">;

const CheckIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 12.5 9.5 18 20 6.5" />
  </Svg>
);

const DriverCardActivated = ({ navigation }: DriverCardActivatedProps) => {
  const [floor, setFloor] = useState("B2");
  const [zone, setZone] = useState("Zone B");
  const [parkingNum, setParkingNum] = useState("42");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.flex}>
        <MobileStatusBar />

        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          <View style={styles.successBanner}>
            <View style={styles.checkCircle}>
              <CheckIcon />
            </View>
            <View>
              <Text style={styles.successTitle}>Card 7204 activated</Text>
              <Text style={styles.successSubtitle}>Hand the card to the guest — they're all set.</Text>
            </View>
          </View>

          <View style={styles.carInfoCard}>
            <View>
              <Text style={styles.carPlate}>DXB · J 5580</Text>
              <Text style={styles.carDesc}>Black Mercedes G63 AMG</Text>
            </View>
            <View style={styles.toParkBadge}>
              <Text style={styles.toParkBadgeText}>To park</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Where did you park it?</Text>
          <Text style={styles.sectionHint}>Type it exactly as you'd say it — this keeps retrieval under 2 minutes.</Text>

          <View style={styles.fieldsContainer}>
            <View>
              <Text style={styles.fieldLabel}>FLOOR</Text>
              <TextInput
                style={styles.textInput}
                value={floor}
                onChangeText={setFloor}
                placeholder="e.g. B2, G"
                placeholderTextColor="#9AA6BC"
              />
            </View>
            <View>
              <Text style={styles.fieldLabel}>PARK ZONE</Text>
              <TextInput
                style={styles.textInput}
                value={zone}
                onChangeText={setZone}
                placeholder="e.g. Zone B"
                placeholderTextColor="#9AA6BC"
              />
            </View>
            <View>
              <Text style={styles.fieldLabel}>PARKING NUMBER</Text>
              <TextInput
                style={styles.textInputActive}
                value={parkingNum}
                onChangeText={setParkingNum}
                placeholder="e.g. 42, P-108"
                placeholderTextColor="#9AA6BC"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverHome")}
          >
            <View style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Parked at {floor} · {zone} · {parkingNum} — Close order</Text>
            </View>
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
    paddingTop: 20,
    paddingBottom: 16,
  },
  successBanner: {
    backgroundColor: "#E7F7EF",
    borderWidth: 1.5,
    borderColor: "#BFE9D4",
    borderRadius: 18,
    padding: 15,
    paddingRight: 18,
    flexDirection: "row",
    gap: 13,
    alignItems: "center",
  },
  checkCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0C9D61",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  successTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0A7C4E",
  },
  successSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3E8A67",
    marginTop: 1,
  },
  carInfoCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAF0",
    borderRadius: 18,
    padding: 16,
    paddingRight: 18,
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carPlate: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1C2B46",
  },
  carDesc: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6C7A93",
    marginTop: 2,
  },
  toParkBadge: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 99,
    backgroundColor: "#FEEFE8",
  },
  toParkBadgeText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#D6430F",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1C2B46",
    marginTop: 20,
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6C7A93",
  },
  fieldsContainer: {
    gap: 12,
    marginTop: 16,
  },
  fieldLabel: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#6C7A93",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  inputField: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
    borderRadius: 14,
    padding: 14,
    paddingLeft: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
    borderRadius: 14,
    padding: 14,
    paddingLeft: 16,
    fontSize: 15,
    fontWeight: "700",
    color: "#1C2B46",
  },
  textInputActive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#F4531F",
    borderRadius: 14,
    padding: 14,
    paddingLeft: 16,
    fontSize: 15,
    fontWeight: "700",
    color: "#1C2B46",
  },
  inputFieldActive: {
    borderWidth: 2,
    borderColor: "#F4531F",
  },
  inputValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C2B46",
  },
  inputPlaceholder: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9AA6BC",
  },
  bottomButtonContainer: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 34,
  },
  closeButton: {
    backgroundColor: "#1C2B46",
    borderRadius: 99,
    padding: 17,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});

export default DriverCardActivated;
