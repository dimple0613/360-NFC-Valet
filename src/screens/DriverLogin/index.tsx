import React, { useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { RootStackScreenProps } from "../../navigation";
import { Colors, Typography } from "../../constants";

type DriverLoginProps = RootStackScreenProps<"DriverLogin">;

const inputContainerStyle = {
	flexDirection: "row" as const,
	alignItems: "center" as const,
	backgroundColor: Colors.surface,
	borderColor: Colors.border,
	borderRadius: 27,
	borderWidth: 1,
	height: 54,
	paddingLeft: 20,
	paddingRight: 20,
	gap: 12,
};

const inputTextStyle = {
	flex: 1,
	color: Colors.text.primary,
	fontSize: Typography.size.md,
	fontWeight: Typography.weight.regular,
};

const statusIconStyle = {
	width: 20,
	height: 20,
	marginRight: 8,
};

export default (props: DriverLoginProps) => {
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);

	return (
		<LinearGradient
			colors={["#2E0F54", "#0F103F"]}
			style={{
				flex: 1,
			}}>
			<SafeAreaView
				style={{
					flex: 1,
				}}>
				<View
					style={{
						flex: 1,
						justifyContent: "space-between",
					}}>
					<View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingVertical: 12,
								paddingHorizontal: 24,
							}}>
							<Text
								style={{
									color: Colors.text.primary,
									fontSize: Typography.size.sm,
									fontWeight: Typography.weight.semibold,
								}}>
								{"9:41"}
							</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Image
									source={require("../../../assets/status-signal.png")}
									resizeMode={"stretch"}
									style={statusIconStyle}
								/>
								<Image
									source={require("../../../assets/status-wifi.png")}
									resizeMode={"stretch"}
									style={statusIconStyle}
								/>
								<Image
									source={require("../../../assets/status-battery.png")}
									resizeMode={"stretch"}
									style={{
										width: 28,
										height: 20,
									}}
								/>
							</View>
						</View>
						<View
							style={{
								alignItems: "center",
								paddingTop: 80,
								paddingBottom: 48,
							}}>
							<LinearGradient
								start={{ x: 0, y: 0.5 }}
								end={{ x: 1, y: 0.5 }}
								colors={[Colors.primary, Colors.secondary]}
								style={{
									width: 80,
									height: 80,
									borderRadius: 40,
									alignItems: "center",
									justifyContent: "center",
									shadowColor: Colors.primary,
									shadowOpacity: 0.25,
									shadowOffset: { width: 0, height: 8 },
									shadowRadius: 16,
									elevation: 6,
								}}>
								<View
									style={{
										width: 30,
										height: 30,
										borderWidth: 2,
										borderColor: Colors.text.primary,
									}}
								/>
							</LinearGradient>
							<View
								style={{
									alignItems: "center",
									marginTop: 16,
								}}>
								<Text
									style={{
										color: Colors.text.primary,
										fontSize: Typography.size.xxl,
										fontWeight: Typography.weight.black,
									}}>
									{"360 NFC Valet"}
								</Text>
								<Text
									style={{
										color: Colors.text.primary,
										fontSize: Typography.size.xs,
										fontWeight: Typography.weight.semibold,
										opacity: 0.6,
										textTransform: "uppercase",
										marginTop: 4,
									}}>
									{"Premium Hospitality"}
								</Text>
							</View>
						</View>
						<View
							style={{
								paddingHorizontal: 32,
								gap: 16,
							}}>
							<View style={inputContainerStyle}>
								<Ionicons
									name="person-outline"
									size={20}
									color={Colors.text.primary}
									style={{ opacity: 0.7 }}
								/>
								<TextInput
									placeholder={"Valet ID or Email"}
									placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
									value={identifier}
									onChangeText={setIdentifier}
									style={inputTextStyle}
								/>
							</View>
							<View style={inputContainerStyle}>
								<Ionicons
									name="lock-closed-outline"
									size={20}
									color={Colors.text.primary}
									style={{ opacity: 0.7 }}
								/>
								<TextInput
									placeholder={"Password"}
									placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
									value={password}
									onChangeText={setPassword}
									secureTextEntry={!passwordVisible}
									style={inputTextStyle}
								/>
								<TouchableOpacity
									onPress={() => setPasswordVisible((v) => !v)}
									activeOpacity={0.8}>
									<Ionicons
										name={passwordVisible ? "eye-outline" : "eye-off-outline"}
										size={20}
										color={Colors.text.primary}
										style={{ opacity: 0.7 }}
									/>
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								onPress={() => props.navigation.navigate("DriverSelectLocation")}
								activeOpacity={0.8}>
								<LinearGradient
									start={{ x: 0, y: 0.5 }}
									end={{ x: 1, y: 0.5 }}
									colors={[Colors.primary, Colors.secondary]}
									style={{
										height: 54,
										borderRadius: 27,
										alignItems: "center",
										justifyContent: "center",
										shadowColor: Colors.primary,
										shadowOpacity: 0.37,
										shadowOffset: { width: 0, height: 8 },
										shadowRadius: 20,
										elevation: 6,
									}}>
									<Text
										style={{
											color: Colors.text.primary,
											fontSize: Typography.size.lg,
											fontWeight: Typography.weight.bold,
										}}>
										{"Log In to Shift"}
									</Text>
								</LinearGradient>
							</TouchableOpacity>
							<View
								style={{
									alignItems: "center",
									paddingTop: 8,
								}}>
								<Text
									style={{
										color: Colors.text.primary,
										opacity: 0.8,
										fontSize: Typography.size.sm,
										fontWeight: Typography.weight.medium,
										textDecorationLine: "underline",
									}}>
									{"Forgot Password?"}
								</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							alignItems: "center",
							paddingTop: 21,
							paddingBottom: 8,
						}}>
						<View
							style={{
								width: 139,
								height: 5,
								backgroundColor: Colors.text.primary,
								borderRadius: 100,
							}}
						/>
					</View>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
};
