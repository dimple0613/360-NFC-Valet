import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Text, TextInput } from "@/theme";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { http } from "../../api/client";
import { ApiEndpoints } from "../../api/endpoints";
import type { RootStackScreenProps } from "../../navigation";
import MobileStatusBar from "../../components/ui/StatusBar";

type Props = RootStackScreenProps<"DriverResetPassword">;

const BackIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C2B46" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 5l-7 7 7 7" />
  </Svg>
);

const DriverResetPassword = ({ navigation, route }: Props) => {
  const { token } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password.trim()) {
      Alert.alert("Password required", "Enter a new password.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Too short", "Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Mismatch", "Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await http.post<{ ok: boolean }>(
        ApiEndpoints.auth.driverResetPassword,
        { token, password: password.trim() },
      );
      Alert.alert("Success", "Your password has been reset. You can now sign in.", [
        { text: "OK", onPress: () => navigation.navigate("DriverLogin") },
      ]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to reset password";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

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

          <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.subtitle}>
              Enter your new password below.
            </Text>

            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>NEW PASSWORD</Text>
              <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                placeholder="At least 6 characters"
                placeholderTextColor="#9AA6BC"
                secureTextEntry
              />
            </View>

            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
              <TextInput
                style={styles.textInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter password"
                placeholderTextColor="#9AA6BC"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={handleReset}
              activeOpacity={0.8}
              disabled={loading}
            >
              <LinearGradient
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["#F4531F", "#FF8A50"]}
                style={[styles.submitButton, loading && { opacity: 0.7 }]}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitText}>Reset password</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#F6F7F9", alignItems: "center", justifyContent: "center", marginLeft: 22, marginTop: 12 },
  content: { paddingHorizontal: 30, paddingTop: 24 },
  title: { fontSize: 26, fontWeight: "800", color: "#1C2B46", letterSpacing: -0.4, lineHeight: 32 },
  subtitle: { fontSize: 14, fontWeight: "500", color: "#6C7A93", marginTop: 8, lineHeight: 20 },
  inputField: { backgroundColor: "#F6F7F9", borderWidth: 1.5, borderColor: "#E7EAF0", borderRadius: 16, paddingHorizontal: 18, paddingVertical: 13, marginTop: 22 },
  inputLabel: { fontSize: 10.5, fontWeight: "800", color: "#6C7A93", letterSpacing: 1.5, textTransform: "uppercase" },
  textInput: { fontSize: 15.5, fontWeight: "700", color: "#1C2B46", marginTop: 2, padding: 0 },
  submitButton: { alignItems: "center", borderRadius: 99, paddingVertical: 17, marginTop: 28 },
  submitText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});

export default DriverResetPassword;
