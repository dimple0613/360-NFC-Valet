import React, {useState} from "react";
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
type DriverSelectLocationProps = RootStackScreenProps<"DriverSelectLocation">;
export default (props: DriverSelectLocationProps) => {
	const [textInput1, onChangeTextInput1] = useState('');
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
						marginBottom: 113,
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
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingVertical: 16,
							paddingHorizontal: 24,
						}}>
						<View
							style={{
								flex: 1,
							}}>
							<Text
								style={{
									color: "#64748B",
									fontSize: 14,
									marginBottom: 2,
								}}>
								{"Welcome back,"}
							</Text>
							<Text
								style={{
									color: "#0F172A",
									fontSize: 22,
									fontWeight: "bold",
								}}>
								{"Ahmed Al-Sabah"}
							</Text>
						</View>
						<Image
							source={require("../../../assets/logo.png")}
							resizeMode={"stretch"}
							style={{
								borderRadius: 24,
								width: 48,
								height: 48,
							}}
						/>
					</View>
					<View
						style={{
							paddingVertical: 16,
							paddingRight: 24,
						}}>
						<View
							style={{
								marginBottom: 4,
								marginLeft: 24,
							}}>
							<Text
								style={{
									color: "#0F172A",
									fontSize: 22,
									fontWeight: "bold",
								}}>
								{"Select Location"}
							</Text>
						</View>
						<Text
							style={{
								color: "#64748B",
								fontSize: 14,
								marginLeft: 24,
							}}>
							{"Confirm your venue for today's shift"}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: "#FFFFFF",
							borderColor: "#E2E8F0",
							borderRadius: 24,
							borderWidth: 1,
							marginBottom: 16,
							marginHorizontal: 24,
						}}>
						<Image
							source={require("../../../assets/icon-email.png")}
							resizeMode={"stretch"}
							style={{
								borderRadius: 24,
								width: 18,
								height: 18,
								marginLeft: 16,
								marginRight: 12,
							}}
						/>
						<TextInput
							placeholder={"Search hotel or center name..."}
							placeholderTextColor="#64748B"
							value={textInput1}
							onChangeText={onChangeTextInput1}
							style={{
								color: "#0F172A",
								fontSize: 14,
								marginRight: 4,
								flex: 1,
								paddingVertical: 15,
							}}
						/>
					</View>
					<View
						style={{
							paddingHorizontal: 24,
						}}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#FFFFFF",
								borderColor: "#6C63FF",
								borderRadius: 16,
								borderWidth: 2,
								padding: 16,
								marginBottom: 12,
								shadowColor: "#0F172A08",
								shadowOpacity: 1,
								shadowOffset: {
								    width: 0,
								    height: 4
								},
								shadowRadius: 12,
								elevation: 12,
							}}>
							<View
								style={{
									borderRadius: 12,
									width: 44,
									height: 44,
									marginRight: 16,
									backgroundColor: "#6C63FF20",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Image
									source={require("../../../assets/icon-lock.png")}
									resizeMode={"stretch"}
									style={{
										width: 20,
										height: 20,
									}}
								/>
							</View>
							<View
								style={{
									flex: 1,
									marginRight: 16,
								}}>
								<Text
									style={{
										color: "#0F172A",
										fontSize: 16,
										fontWeight: "bold",
										marginBottom: 2,
									}}>
									{"The Ritz-Carlton Regent"}
								</Text>
								<Text
									style={{
										color: "#64748B",
										fontSize: 12,
									}}>
									{"100 Ritz-Carlton Dr"}
								</Text>
							</View>
							<View
								style={{
									width: 24,
									height: 24,
									borderRadius: 12,
									borderColor: "#6C63FF",
									backgroundColor: "#6C63FF",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "bold" }}>{"✓"}</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#FFFFFF",
								borderColor: "#E2E8F0",
								borderRadius: 16,
								borderWidth: 1,
								padding: 16,
								marginBottom: 12,
								shadowColor: "#0F172A08",
								shadowOpacity: 1,
								shadowOffset: {
								    width: 0,
								    height: 4
								},
								shadowRadius: 12,
								elevation: 12,
							}}>
							<View
								style={{
									borderRadius: 12,
									width: 44,
									height: 44,
									marginRight: 16,
									backgroundColor: "#F1F5F9",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Image
									source={require("../../../assets/icon-eye.png")}
									resizeMode={"stretch"}
									style={{
										width: 20,
										height: 20,
									}}
								/>
							</View>
							<View
								style={{
									flex: 1,
									marginRight: 16,
								}}>
								<Text
									style={{
										color: "#0F172A",
										fontSize: 16,
										fontWeight: "bold",
										marginBottom: 2,
									}}>
									{"Four Seasons Waterfront"}
								</Text>
								<Text
									style={{
										color: "#64748B",
										fontSize: 12,
									}}>
									{"250 Ocean Boulevard"}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#FFFFFF",
								borderColor: "#E2E8F0",
								borderRadius: 16,
								borderWidth: 1,
								padding: 16,
								marginBottom: 12,
								shadowColor: "#0F172A08",
								shadowOpacity: 1,
								shadowOffset: {
								    width: 0,
								    height: 4
								},
								shadowRadius: 12,
								elevation: 12,
							}}>
							<View
								style={{
									borderRadius: 12,
									width: 44,
									height: 44,
									marginRight: 16,
									backgroundColor: "#F1F5F9",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Image
									source={require("../../../assets/icon-lock.png")}
									resizeMode={"stretch"}
									style={{
										width: 20,
										height: 20,
									}}
								/>
							</View>
							<View
								style={{
									flex: 1,
									marginRight: 16,
								}}>
								<Text
									style={{
										color: "#0F172A",
										fontSize: 16,
										fontWeight: "bold",
										marginBottom: 2,
										width: 138,
									}}>
									{"Mandarin Oriental Center"}
								</Text>
								<Text
									style={{
										color: "#64748B",
										fontSize: 12,
									}}>
									{"75 Mandarin Way"}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#FFFFFF",
								borderColor: "#E2E8F0",
								borderRadius: 16,
								borderWidth: 1,
								padding: 16,
								shadowColor: "#0F172A08",
								shadowOpacity: 1,
								shadowOffset: {
								    width: 0,
								    height: 4
								},
								shadowRadius: 12,
								elevation: 12,
							}}>
							<View
								style={{
									borderRadius: 12,
									width: 44,
									height: 44,
									marginRight: 16,
									backgroundColor: "#F1F5F9",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Image
									source={require("../../../assets/icon-eye.png")}
									resizeMode={"stretch"}
									style={{
										width: 20,
										height: 20,
									}}
								/>
							</View>
							<View
								style={{
									flex: 1,
									marginRight: 16,
								}}>
								<Text
									style={{
										color: "#0F172A",
										fontSize: 16,
										fontWeight: "bold",
										marginBottom: 2,
									}}>
									{"Rosewood Mansion"}
								</Text>
								<Text
									style={{
										color: "#64748B",
										fontSize: 12,
									}}>
									{"12 Suite Avenue"}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View
					style={{
						paddingBottom: 16,
						paddingHorizontal: 24,
					}}>
					<TouchableOpacity
						onPress={() => props.navigation.navigate('DriverNfcTap')}
						activeOpacity={0.8}>
						<LinearGradient
							start={{x:0, y:0.5}}
							end={{x:1, y:0.5}}
							colors={["#5B5BFF", "#8B5CF6"]}
							style={{
								alignItems: "center",
								borderRadius: 27,
								paddingVertical: 17,
								marginBottom: 16,
							}}>
							<Text
								style={{
									color: "#FFFFFF",
									fontSize: 16,
									fontWeight: "bold",
								}}>
								{"Confirm & Start Shift"}
							</Text>
						</LinearGradient>
					</TouchableOpacity>
					<View
						style={{
							alignItems: "center",
							paddingTop: 21,
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
