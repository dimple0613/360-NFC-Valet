import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, Easing, ActivityIndicator } from "react-native";
import { Text, TextInput } from "@/theme";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNfc } from "../../hooks/useNfc";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";
import { toast } from "../../utils/toast";

type Props = RootStackScreenProps<"DriverNfcTap">;

const BackIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 5l-7 7 7 7" />
  </Svg>
);

const NfcCardIcon = ({ size = 62 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="2.5" width="16" height="19" rx="3" />
    <Path d="M9.5 9.5a4.2 4.2 0 0 1 5 0" />
    <Path d="M8 7a7 7 0 0 1 8 0" />
    <Circle cx="12" cy="13.5" r="1.4" fill="#fff" stroke="none" />
  </Svg>
);

const PulseRing = ({ delay }: { delay: number }) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(0.55)).current;

  React.useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.9,
            duration: 1800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.55,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [delay, scale, opacity]);

  return (
    <Animated.View
      style={[
        styles.pulseRing,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  );
};

const DriverNfcTap = ({ navigation }: Props) => {
  const { supported, reading, readTag } = useNfc();
  const [manualUid, setManualUid] = useState("");
  const [showManual, setShowManual] = useState(false);
  const [detectedUid, setDetectedUid] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const goToDetails = useCallback(
    (uid: string) => {
      navigation.navigate("DriverCarDetails", { cardUid: uid });
    },
    [navigation],
  );

  useEffect(() => {
    if (!supported || confirming) return;
    let active = true;
    const poll = async () => {
      while (active) {
        const uid = await readTag();
        if (uid && active) {
          setDetectedUid(uid);
          setConfirming(true);
          active = false;
          return;
        }
      }
    };
    poll();
    return () => {
      active = false;
    };
  }, [supported, readTag, goToDetails, confirming]);

  const handleManualSubmit = () => {
    if (!manualUid.trim()) {
      toast.error("Enter card number", "Type the 4-digit number printed on the card (e.g. 7001).");
      return;
    }
    goToDetails(manualUid.trim());
  };

  const handleConfirmDetected = () => {
    if (detectedUid) goToDetails(detectedUid);
  };

  const handleDetectedWrong = () => {
    setDetectedUid(null);
    setConfirming(false);
    setShowManual(true);
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
          <Text style={styles.headerTitle}>New arrival</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.centerContent}>
          <View style={styles.nfcAnimationArea}>
            <PulseRing delay={0} />
            <PulseRing delay={600} />
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={confirming ? ["#0C9D61", "#2ECC71"] : ["#F4531F", "#FF8A50"]}
              style={styles.nfcIconCircle}
            >
              <NfcCardIcon size={62} />
            </LinearGradient>
          </View>

          {confirming && detectedUid ? (
            <>
              <Text style={styles.detectedLabel}>Card detected</Text>
              <Text style={styles.detectedUid}>{detectedUid}</Text>
              <Text style={styles.holdSubtitle}>
                Does this match the 4-digit number printed on the card?
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.holdTitle}>
                {reading ? "Scanning..." : "Hold card near phone"}
              </Text>
              <Text style={styles.holdSubtitle}>
                {supported
                  ? "Reading writes the card ID automatically."
                  : "NFC not available on this device."}
                {"\n"}You'll confirm the 4-digit UID printed on the card next.
              </Text>
            </>
          )}
        </View>

        <View style={styles.bottomButtonContainer}>
          {confirming && detectedUid ? (
            <View style={styles.confirmContainer}>
              <TouchableOpacity activeOpacity={0.8} onPress={handleConfirmDetected}>
                <View style={styles.confirmButton}>
                  <Text style={styles.confirmButtonText}>Yes — continue</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={handleDetectedWrong}>
                <View style={styles.wrongButton}>
                  <Text style={styles.wrongButtonText}>Wrong card — enter manually</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : showManual ? (
            <View style={styles.manualInputContainer}>
              <TextInput
                style={styles.manualInput}
                value={manualUid}
                onChangeText={setManualUid}
                placeholder="e.g. 7001"
                placeholderTextColor="#9AA6BC"
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleManualSubmit}
              >
                <View style={styles.manualSubmitButton}>
                  <Text style={styles.manualSubmitText}>Go</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={() => setShowManual(true)}>
              <View style={styles.manualButton}>
                <Text style={styles.manualButtonText}>Enter card manually</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#131B2E",
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  headerSpacer: {
    width: 40,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 34,
  },
  nfcAnimationArea: {
    position: "relative",
    width: 230,
    height: 230,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseRing: {
    position: "absolute",
    inset: 0,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: "rgba(244,83,31,0.55)",
  },
  nfcIconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F4531F",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 18 },
    shadowRadius: 44,
    elevation: 10,
  },
  holdTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 36,
  },
  holdSubtitle: {
    fontSize: 13.5,
    fontWeight: "500",
    color: "#9FB0CC",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },
  bottomButtonContainer: {
    paddingHorizontal: 26,
    paddingBottom: 36,
  },
  manualButton: {
    padding: 15,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
  },
  manualButtonText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
  },
  manualInputContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  manualInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 99,
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
  },
  manualSubmitButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F4531F",
    alignItems: "center",
    justifyContent: "center",
  },
  manualSubmitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  detectedLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0C9D61",
    marginTop: 36,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  detectedUid: {
    fontSize: 42,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 12,
    letterSpacing: 4,
  },
  confirmContainer: {
    gap: 12,
  },
  confirmButton: {
    padding: 16,
    borderRadius: 99,
    backgroundColor: "#0C9D61",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  wrongButton: {
    padding: 14,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
  },
  wrongButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default DriverNfcTap;
