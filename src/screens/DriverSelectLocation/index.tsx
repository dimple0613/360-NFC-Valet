import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type DriverSelectLocationProps = RootStackScreenProps<"DriverSelectLocation">;

type Location = {
  id: string;
  name: string;
  area: string;
  drivers: number;
};

const locations: Location[] = [
  { id: "1", name: "JW Marriott Marquis", area: "Business Bay", drivers: 6 },
  { id: "2", name: "Address Downtown", area: "Downtown Dubai", drivers: 4 },
  { id: "3", name: "Atlantis The Royal", area: "Palm Jumeirah", drivers: 8 },
];

const BuildingIcon = ({ color }: { color: string }) => (
  <Svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M3 21h18" />
    <Path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
    <Path d="M15 9h4v12" />
    <Path d="M8 8h1M8 12h1M11 8h1M11 12h1" />
  </Svg>
);

const CheckIcon = () => (
  <Svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="3.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M4 12.5 9.5 18 20 6.5" />
  </Svg>
);

const DriverSelectLocation = ({ navigation }: DriverSelectLocationProps) => {
  const [selectedId, setSelectedId] = useState("1");

  const selectedLocation = locations.find((l) => l.id === selectedId);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.flex}>
        <MobileStatusBar />

        <View style={styles.content}>
          <Text style={styles.greeting}>Good morning, Ramesh 👋</Text>
          <Text style={styles.title}>Where are you working today?</Text>

          <View style={styles.locationList}>
            {locations.map((location) => {
              const isSelected = location.id === selectedId;
              return (
                <TouchableOpacity
                  key={location.id}
                  onPress={() => setSelectedId(location.id)}
                  activeOpacity={0.8}
                  style={[
                    styles.locationCard,
                    isSelected && styles.locationCardSelected,
                  ]}
                >
                  <View
                    style={[
                      styles.locationIcon,
                      isSelected && styles.locationIconSelected,
                    ]}
                  >
                    <BuildingIcon color={isSelected ? "#F4531F" : "#6C7A93"} />
                  </View>

                  <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>{location.name}</Text>
                    <Text style={styles.locationArea}>
                      {location.area} · {location.drivers} drivers on shift
                    </Text>
                  </View>

                  {isSelected ? (
                    <View style={styles.radioSelected}>
                      <CheckIcon />
                    </View>
                  ) : (
                    <View style={styles.radioUnselected} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DriverHome")}
              activeOpacity={0.8}
            >
              <LinearGradient
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["#F4531F", "#FF8A50"]}
                style={styles.startButton}
              >
                <Text style={styles.startButtonText}>
                  Start my day at {selectedLocation?.name.split(" ")[0]}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 34,
  },
  greeting: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6C7A93",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1C2B46",
    letterSpacing: -0.4,
    marginTop: 4,
  },
  locationList: {
    marginTop: 24,
    gap: 12,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
    borderRadius: 18,
    padding: 16,
    gap: 14,
  },
  locationCardSelected: {
    borderWidth: 2,
    borderColor: "#F4531F",
    shadowColor: "#F4531F",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 6,
  },
  locationIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#F6F7F9",
    alignItems: "center",
    justifyContent: "center",
  },
  locationIconSelected: {
    backgroundColor: "#FEEFE8",
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1C2B46",
  },
  locationArea: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6C7A93",
    marginTop: 2,
  },
  radioSelected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F4531F",
    alignItems: "center",
    justifyContent: "center",
  },
  radioUnselected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E7EAF0",
  },
  footer: {
    marginTop: "auto",
  },
  startButton: {
    alignItems: "center",
    borderRadius: 99,
    paddingVertical: 17,
    shadowColor: "#F4531F",
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
    elevation: 6,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});

export default DriverSelectLocation;
