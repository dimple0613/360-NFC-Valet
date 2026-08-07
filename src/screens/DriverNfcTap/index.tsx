import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
type DriverNfcTapProps = RootStackScreenProps<"DriverNfcTap">;
export default (props: DriverNfcTapProps) => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: "#F8FAFC",
				}}>
				<View
					style={{
						marginBottom: 169,
					}}>
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
								color: "#0F172A",
								fontSize: 14,
								fontWeight: "bold",
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
								style={{
									width: 20,
									height: 20,
									marginRight: 8,
								}}
							/>
							<Image
								source={require("../../../assets/status-wifi.png")}
								resizeMode={"stretch"}
								style={{
									width: 20,
									height: 20,
									marginRight: 8,
								}}
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
					<LinearGradient
						start={{x:0, y:0}}
						end={{x:0, y:1}}
						colors={["#2E0F54", "#0F103F"]}
						style={{
							borderBottomRightRadius: 24,
							borderBottomLeftRadius: 24,
							paddingTop: 20,
							paddingBottom: 24,
							paddingRight: 24,
						}}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 16,
								marginLeft: 24,
							}}>
							<TouchableOpacity onPress={() => props.navigation.goBack()}>
								<Image
									source={require("../../../assets/icon-email.png")}
									resizeMode={"stretch"}
									style={{
										borderRadius: 18,
										width: 36,
										height: 32,
										tintColor: "#FFFFFF",
									}}
								/>
							</TouchableOpacity>
							<Text
								style={{
									color: "#FFFFFF",
									fontSize: 18,
									fontWeight: "bold",
								}}>
								{"NFC Tag Activation"}
							</Text>
							<View
								style={{
									width: 36,
									height: 32,
								}}>
							</View>
						</View>
						<View
							style={{
								alignSelf: "flex-start",
								flexDirection: "row",
								alignItems: "center",
								marginLeft: 24,
							}}>
							<View
								style={{
									width: 14,
									height: 14,
									borderRadius: 7,
									backgroundColor: "#6C63FF",
									marginRight: 8,
								}}
							/>
							<Text
								style={{
									color: "#FFFFFF",
									fontSize: 13,
									fontWeight: "bold",
								}}>
								{"Ritz-Carlton Regent"}
							</Text>
						</View>
					</LinearGradient>
					<View
						style={{
							alignItems: "center",
							paddingTop: 40,
						}}>
						<View
							style={{
								alignItems: "center",
								paddingHorizontal: 3,
								marginBottom: 32,
							}}>
							<Text
								style={{
									color: "#0F172A",
									fontSize: 22,
									fontWeight: "bold",
									marginBottom: 8,
								}}>
								{"Tap NFC Card"}
							</Text>
							<Text
								style={{
									color: "#64748B",
									fontSize: 14,
									textAlign: "center",
									width: 274,
								}}>
								{"Hold the customer's RFID keycard against the back of your phone"}
							</Text>
						</View>
						<Image
							source={require("../../../assets/nfc-tap.png")}
							resizeMode={"contain"}
							style={{
								width: 260,
								height: 260,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						alignItems: "center",
						paddingBottom: 20,
					}}>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: "#E0F2FE",
							borderRadius: 16,
							paddingVertical: 8,
							paddingHorizontal: 16,
							marginBottom: 20,
						}}
						onPress={() => alert('Pressed!')}
						activeOpacity={0.8}>
						<View
							style={{
								width: 8,
								height: 8,
								borderRadius: 4,
								backgroundColor: "#0369A1",
								marginRight: 8,
							}}
						/>
						<Text
							style={{
								color: "#0369A1",
								fontSize: 13,
								fontWeight: "bold",
							}}>
							{"Ready to Scan"}
						</Text>
					</TouchableOpacity>
					<View
						style={{
							alignSelf: "stretch",
							alignItems: "center",
							paddingTop: 21,
							marginHorizontal: 24,
						}}>
						<View
							style={{
								width: 139,
								height: 5,
								backgroundColor: "#0F172A",
								borderRadius: 100,
								marginBottom: 8,
							}}>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
