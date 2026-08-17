import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { http } from "../../api/client";
import { ApiEndpoints } from "../../api/endpoints";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type Props = RootStackScreenProps<"DriverCardActivated">;

const CheckIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 12.5 9.5 18 20 6.5" />
  </Svg>
);

const DriverCardActivated = ({ navigation, route }: Props) => {
  const { orderId, plate, carDesc } = route.params;
  const [zone, setZone] = useState("");
  const [slot, setSlot] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePark = async () => {
    if (!zone.trim() || !slot.trim()) {
      Alert.alert("Location required", "Enter both zone and slot.");
      return;
    }
    setLoading(true);
    try {
      await http.patch<{ ok: boolean }>(
        ApiEndpoints.driver.orderStatus(orderId),
        { status: "parked", zone: zone.trim(), slot: slot.trim() },
      );
      navigation.navigate("DriverHome");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

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
              <Text style={styles.successTitle}>Order #{orderId} created</Text>
              <Text style={styles.successSubtitle}>Now park the car and enter its location.</Text>
            </View>
          </View>

          <View style={styles.carInfoCard}>
            <View>
              <Text style={styles.carPlate}>{plate}</Text>
              <Text style={styles.carDesc}>{carDesc}</Text>
            </View>
            <View style={styles.toParkBadge}>
              <Text style={styles.toParkBadgeText}>To park</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Where did you park it?</Text>

          <View style={styles.fieldsContainer}>
            <View>
              <Text style={styles.fieldLabel}>ZONE</Text>
              <TextInput
                style={styles.textInput}
                value={zone}
                onChangeText={setZone}
                placeholder="e.g. Zone B"
                placeholderTextColor="#9AA6BC"
                autoCapitalize="characters"
              />
            </View>
            <View>
              <Text style={styles.fieldLabel}>SLOT NUMBER</Text>
              <TextInput
                style={styles.textInput}
                value={slot}
                onChangeText={setSlot}
                placeholder="e.g. 42"
                placeholderTextColor="#9AA6BC"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePark}
            disabled={loading}
          >
            <View style={[styles.closeButton, loading && { opacity: 0.7 }]}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.closeButtonText}>
                  Park at {zone || "?"} · {slot || "?"} — Save
                </Text>
              )}
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
