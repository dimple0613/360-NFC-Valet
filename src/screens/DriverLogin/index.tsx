import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Svg, { Rect, Path, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type DriverLoginProps = RootStackScreenProps<"DriverLogin">;

const DriverLogin = ({ navigation }: DriverLoginProps) => {
  const [driverId, setDriverId] = useState("VD-0248");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <MobileStatusBar />

          <View style={styles.content}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={["#F4531F", "#FF8A50"]}
              style={styles.logo}
            >
              <Svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Path d="M6 8a7 7 0 0 1 0 8" />
                <Path d="M9.5 5.5a11 11 0 0 1 0 13" />
                <Path d="M13 3a15 15 0 0 1 0 18" />
              </Svg>
            </LinearGradient>

            <Text style={styles.title}>360 NFC Valet</Text>
            <Text style={styles.subtitle}>
              Driver console. Sign in to start your shift.
            </Text>

            <View style={styles.form}>
              <View style={styles.inputField}>
                <Text style={styles.inputLabel}>Driver ID</Text>
                <Text style={styles.inputValue}>{driverId}</Text>
              </View>

              <View style={styles.inputFieldRow}>
                <View style={styles.inputFieldLeft}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <Text style={styles.passwordValue}>
                    {passwordVisible ? password || "••••••••" : "••••••••"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6C7A93"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <Path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
                    <Circle cx="12" cy="12" r="2.6" />
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DriverSelectLocation")}
              activeOpacity={0.8}
            >
              <LinearGradient
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["#F4531F", "#FF8A50"]}
                style={styles.signInButton}
              >
                <Text style={styles.signInText}>Sign in</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footerNote}>
              Accounts are created by your admin — no self sign-up.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 34,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F4531F",
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1C2B46",
    letterSpacing: -0.5,
    marginTop: 26,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6C7A93",
    marginTop: 6,
  },
  form: {
    marginTop: 34,
    gap: 14,
  },
  inputField: {
    backgroundColor: "#F6F7F9",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  inputLabel: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#6C7A93",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  inputValue: {
    fontSize: 15.5,
    fontWeight: "700",
    color: "#1C2B46",
    marginTop: 2,
  },
  inputFieldRow: {
    backgroundColor: "#F6F7F9",
    borderWidth: 1.5,
    borderColor: "#E7EAF0",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputFieldLeft: {
    flex: 1,
  },
  passwordValue: {
    fontSize: 15.5,
    fontWeight: "700",
    color: "#1C2B46",
    marginTop: 2,
    letterSpacing: 3,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginTop: 14,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F4531F",
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 34,
  },
  signInButton: {
    alignItems: "center",
    borderRadius: 99,
    paddingVertical: 17,
    shadowColor: "#F4531F",
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
    elevation: 6,
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  footerNote: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6C7A93",
    textAlign: "center",
    marginTop: 14,
  },
});

export default DriverLogin;
