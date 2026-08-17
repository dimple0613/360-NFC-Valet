import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { http } from "../../api/client";
import { ApiEndpoints } from "../../api/endpoints";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type Props = RootStackScreenProps<"DriverCarDetails">;

const BackIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C2B46" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 5l-7 7 7 7" />
  </Svg>
);

const COLORS = [
  { id: "1", name: "Black", bg: "#16181C" },
  { id: "2", name: "White", bg: "#FFFFFF", border: "#E7EAF0" },
  { id: "3", name: "Silver", bg: "#C7CCD6" },
  { id: "4", name: "Grey", bg: "#7A8699" },
];

const DriverCarDetails = ({ navigation, route }: Props) => {
  const { cardUid } = route.params;
  const [plate, setPlate] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [selectedColor, setSelectedColor] = useState("1");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!plate.trim()) {
      Alert.alert("Plate required", "Enter the plate number.");
      return;
    }
    setLoading(true);
    try {
      const res = await http.post<{ orderId: number; createdAt: string }>(
        ApiEndpoints.driver.orders,
        {
          cardUid,
          plate: plate.trim(),
          carMake: carMake.trim() || undefined,
          carModel: carModel.trim() || undefined,
          carColor: COLORS.find((c) => c.id === selectedColor)?.name,
        },
      );
      navigation.replace("DriverCardActivated", {
        orderId: res.orderId,
        plate: plate.trim(),
        carDesc: [COLORS.find((c) => c.id === selectedColor)?.name, carMake, carModel].filter(Boolean).join(" "),
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create order";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

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
            <Text style={styles.badgeText}>Card read</Text>
          </View>
        </View>

        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          <View style={styles.uidCard}>
            <View>
              <Text style={styles.uidLabel}>CARD UID</Text>
              <Text style={styles.uidValue}>{cardUid}</Text>
            </View>
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>PLATE NUMBER</Text>
            <TextInput
              style={styles.textInput}
              value={plate}
              onChangeText={setPlate}
              placeholder="e.g. DXB J 5580"
              placeholderTextColor="#9AA6BC"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.makeModelGrid}>
            <View style={[styles.fieldCard, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>MAKE</Text>
              <TextInput
                style={styles.textInput}
                value={carMake}
                onChangeText={setCarMake}
                placeholder="e.g. Mercedes"
                placeholderTextColor="#9AA6BC"
              />
            </View>
            <View style={[styles.fieldCard, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>MODEL</Text>
              <TextInput
                style={styles.textInput}
                value={carModel}
                onChangeText={setCarModel}
                placeholder="e.g. G63"
                placeholderTextColor="#9AA6BC"
              />
            </View>
          </View>

          <View style={styles.fieldCard}>
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
            onPress={handleConfirm}
            disabled={loading}
          >
            <View style={[styles.nextButton, loading && { opacity: 0.7 }]}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.nextButtonText}>Confirm & park</Text>
              )}
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
  },
  uidLabel: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#9FB0CC",
    textTransform: "uppercase",
  },
  uidValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 6,
    letterSpacing: 3,
  },
  fieldCard: {
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
  textInput: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
    color: "#1C2B46",
    padding: 0,
  },
  makeModelGrid: {
    flexDirection: "row",
    gap: 12,
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
