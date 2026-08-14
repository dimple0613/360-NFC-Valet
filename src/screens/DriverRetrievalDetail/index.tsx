import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type DriverRetrievalDetailProps = RootStackScreenProps<"DriverRetrievalDetail">;

const BackIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C2B46" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 5l-7 7 7 7" />
  </Svg>
);

const CarIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1C2B46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 11l1.2-4A2 2 0 0 1 6.1 5h11.8a2 2 0 0 1 1.9 2l1.2 4" />
    <Rect x="3" y="11" width="18" height="6" rx="2" />
    <Circle cx="7.5" cy="17.5" r="1.6" />
    <Circle cx="16.5" cy="17.5" r="1.6" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0C9D61" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 12.5 9.5 18 20 6.5" />
  </Svg>
);

const parseTimer = (t: string): number => {
  const [min, sec] = t.split(":").map(Number);
  return min * 60 + sec;
};

const formatTimer = (totalSec: number): string => {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const TimerRing = ({ time }: { time: string }) => {
  const totalSeconds = parseTimer(time);
  const maxSeconds = 10 * 60;
  const progress = Math.min(totalSeconds / maxSeconds, 1);
  const circumference = 2 * Math.PI * 84;
  const dashoffset = circumference * (1 - progress);

  return (
    <View style={styles.timerContainer}>
      <Svg width="190" height="190" viewBox="0 0 190 190">
        <Circle
          cx="95"
          cy="95"
          r="84"
          fill="none"
          stroke="#EDEFF3"
          strokeWidth="12"
        />
        <Circle
          cx="95"
          cy="95"
          r="84"
          fill="none"
          stroke="#F4531F"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 95 95)"
        />
      </Svg>
      <View style={styles.timerTextContainer}>
        <Text style={styles.timerValue}>{time}</Text>
        <Text style={styles.timerLabel}>GUEST ARRIVES</Text>
      </View>
    </View>
  );
};

const DriverRetrievalDetail = ({ navigation }: DriverRetrievalDetailProps) => {
  const [timer, setTimer] = useState("08:32");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        const secs = parseTimer(prev);
        if (secs <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return "00:00";
        }
        return formatTimer(secs - 1);
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const addMinutes = (mins: number) => {
    setTimer((prev) => {
      const secs = parseTimer(prev) + mins * 60;
      return formatTimer(Math.min(secs, 60 * 60));
    });
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
          <Text style={styles.headerTitle}>Retrieving</Text>
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>Card 7091</Text>
          </View>
        </View>

        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          <View style={styles.timerSection}>
            <TimerRing time={timer} />
            <View style={styles.delayButtons}>
              <TouchableOpacity style={styles.delayButton} activeOpacity={0.7} onPress={() => addMinutes(5)}>
                <Text style={styles.delayButtonText}>+5 min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.delayButton} activeOpacity={0.7} onPress={() => addMinutes(10)}>
                <Text style={styles.delayButtonText}>+10 min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.notifyDelayButton} activeOpacity={0.7}>
                <Text style={styles.notifyDelayButtonText}>Notify delay</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.carInfoCard}>
            <View style={styles.carInfoHeader}>
              <View>
                <Text style={styles.carPlate}>DXB · A 74126</Text>
                <Text style={styles.carDesc}>White Lexus LX 600</Text>
              </View>
              <View style={styles.carIconTile}>
                <CarIcon size={24} />
              </View>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoCell}>
                <Text style={styles.infoCellLabel}>ZONE</Text>
                <Text style={styles.infoCellValue}>B</Text>
              </View>
              <View style={styles.infoCell}>
                <Text style={styles.infoCellLabel}>SLOT</Text>
                <Text style={styles.infoCellValue}>B-42</Text>
              </View>
              <View style={styles.infoCell}>
                <Text style={styles.infoCellLabel}>DROPPED</Text>
                <Text style={styles.infoCellValue}>11:24</Text>
              </View>
            </View>

            <View style={styles.validationBanner}>
              <CheckIcon />
              <Text style={styles.validationText}>Valet validated at La Farine Bakery · parking free</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverHome")}
          >
            <View style={styles.arrivedButton}>
              <Text style={styles.arrivedButtonText}>Car arrived — notify guest</Text>
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
  cardBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: "#FEEFE8",
  },
  cardBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#D6430F",
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 14,
  },
  timerSection: {
    alignItems: "center",
    marginTop: 8,
  },
  timerContainer: {
    position: "relative",
    width: 190,
    height: 190,
  },
  timerTextContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  timerValue: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -1,
    color: "#1C2B46",
  },
  timerLabel: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#6C7A93",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginTop: 2,
  },
  delayButtons: {
    flexDirection: "row",
    gap: 9,
    marginTop: 16,
  },
  delayButton: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 99,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
  },
  delayButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1C2B46",
  },
  notifyDelayButton: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 99,
    backgroundColor: "#FDF3E3",
    borderWidth: 1.5,
    borderColor: "#F2DDB2",
  },
  notifyDelayButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#B97B17",
  },
  carInfoCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAF0",
    borderRadius: 20,
    padding: 18,
    marginTop: 22,
  },
  carInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carPlate: {
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: 0.3,
    color: "#1C2B46",
  },
  carDesc: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#6C7A93",
    marginTop: 2,
  },
  carIconTile: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#F6F7F9",
    alignItems: "center",
    justifyContent: "center",
  },
  infoGrid: {
    flexDirection: "row",
    gap: 9,
    marginTop: 14,
  },
  infoCell: {
    flex: 1,
    backgroundColor: "#F6F7F9",
    borderRadius: 12,
    padding: 10,
    paddingLeft: 12,
  },
  infoCellLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#6C7A93",
    textTransform: "uppercase",
  },
  infoCellValue: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 2,
    color: "#1C2B46",
  },
  validationBanner: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginTop: 13,
    backgroundColor: "#E7F7EF",
    borderRadius: 12,
    padding: 10,
    paddingLeft: 13,
  },
  validationText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0A7C4E",
  },
  bottomButtonContainer: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 34,
  },
  arrivedButton: {
    backgroundColor: "#0C9D61",
    borderRadius: 99,
    padding: 18,
    alignItems: "center",
    shadowColor: "#0C9D61",
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 6,
  },
  arrivedButtonText: {
    color: "#FFFFFF",
    fontSize: 16.5,
    fontWeight: "800",
  },
});

export default DriverRetrievalDetail;
