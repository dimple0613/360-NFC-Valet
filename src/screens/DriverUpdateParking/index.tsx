import React, {useState} from "react";
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
type DriverUpdateParkingProps = RootStackScreenProps<"DriverUpdateParking">;
export default (props: DriverUpdateParkingProps) => {
	const [textInput1, onChangeTextInput1] = useState('');
	const [textInput2, onChangeTextInput2] = useState('');
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
						marginBottom: 110,
					}}>
					<View
						style={{
							marginBottom: 16,
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
								paddingTop: 12,
								paddingRight: 24,
							}}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 12,
									marginLeft: 24,
								}}>
								<TouchableOpacity onPress={() => props.navigation.goBack()}>
									<Image
										source={require("../../../assets/icon-back.png")}
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
									{"Update Parking"}
								</Text>
								<View
									style={{
										width: 36,
										height: 32,
									}}>
								</View>
							</View>
							<Text
								style={{
									color: "#FFFFFF",
									fontSize: 13,
									marginBottom: 28,
									marginLeft: 24,
								}}>
								{"Ritz-Carlton Regent Valet Services"}
							</Text>
						</LinearGradient>
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
								borderColor: "#E2E8F0",
								borderRadius: 16,
								borderWidth: 1,
								padding: 16,
								marginBottom: 20,
								shadowColor: "#0F172A08",
								shadowOpacity: 1,
								shadowOffset: {
								    width: 0,
								    height: 4
								},
								shadowRadius: 12,
								elevation: 12,
							}}>
							<Image
								source={require("../../../assets/icon-car.png")}
								resizeMode={"stretch"}
								style={{
									borderRadius: 10,
									width: 40,
									height: 40,
									marginRight: 16,
								}}
							/>
							<View
								style={{
									flex: 1,
									marginRight: 16,
								}}>
								<Text
									style={{
										color: "#0F172A",
										fontSize: 14,
										fontWeight: "bold",
										marginBottom: 2,
									}}>
									{"Mercedes-Benz S-Class"}
								</Text>
								<Text
									style={{
										color: "#64748B",
										fontSize: 12,
									}}>
									{"Obsidian Black • KSA-9082"}
								</Text>
							</View>
							<View
								style={{
									backgroundColor: "#6C63FF0F",
									borderRadius: 8,
									paddingVertical: 3,
									paddingHorizontal: 8,
								}}>
								<Text
									style={{
										color: "#6C63FF",
										fontSize: 11,
										fontWeight: "bold",
									}}>
									{"# 9841-A"}
								</Text>
							</View>
						</View>
						<View
							style={{
								backgroundColor: "#FFFFFF",
								borderColor: "#E2E8F0",
								borderRadius: 16,
								borderWidth: 1,
								padding: 20,
								marginBottom: 20,
							}}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 16,
								}}>
								<Text
									style={{
										color: "#64748B",
										fontSize: 14,
										fontWeight: "bold",
									}}>
									{"Select Parking Slot"}
								</Text>
								<Text
									style={{
										color: "#6C63FF",
										fontSize: 13,
										fontWeight: "bold",
									}}>
									{"Zone B Active"}
								</Text>
							</View>
							<View
								style={{
									height: 100,
									marginBottom: 16,
									backgroundColor: "#F8FAFC",
									borderRadius: 8,
									borderWidth: 1,
									borderColor: "#E2E8F0",
									borderStyle: "dashed",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Text
									style={{
										color: "#94A3B8",
										fontSize: 13,
									}}>
									{"Parking Map"}
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									paddingVertical: 8,
								}}>
								<View
									style={{
										flex: 1,
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										marginRight: 45,
									}}>
									<View
										style={{
											width: 12,
											height: 12,
											backgroundColor: "#F1F5F9",
											borderRadius: 3,
											marginRight: 6,
										}}
									/>
									<Text
										style={{
											color: "#64748B",
											fontSize: 12,
										}}>
										{"Occupied"}
									</Text>
								</View>
								<View
									style={{
										flex: 1,
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										marginRight: 45,
									}}>
									<View
										style={{
											width: 12,
											height: 12,
											backgroundColor: "#6C63FF1F",
											borderRadius: 3,
											marginRight: 6,
										}}
									/>
									<Text
										style={{
											color: "#6C63FF",
											fontSize: 12,
										}}>
										{"Available"}
									</Text>
								</View>
								<View
									style={{
										flex: 1,
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
									}}>
									<View
										style={{
											width: 12,
											height: 12,
											backgroundColor: "#6C63FF",
											borderRadius: 3,
											marginRight: 6,
										}}
									/>
									<Text
										style={{
											color: "#6C63FF",
											fontSize: 12,
											fontWeight: "bold",
										}}>
										{"Selected"}
									</Text>
								</View>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}>
							<View
								style={{
									flex: 1,
									marginRight: 12,
								}}>
								<Text
									style={{
										color: "#0F172A",
										fontSize: 13,
										fontWeight: "bold",
										marginBottom: 8,
									}}>
									{"Selected Zone"}
								</Text>
								<TextInput
									placeholder={"Zone B"}
									placeholderTextColor="#94A3B8"
									value={textInput1}
									onChangeText={onChangeTextInput1}
									style={{
										color: "#0F172A",
										fontSize: 14,
										fontWeight: "bold",
										backgroundColor: "#FFFFFF",
										borderColor: "#6C63FF",
										borderRadius: 12,
										borderWidth: 2,
										padding: 16,
									}}
								/>
							</View>
							<View
								style={{
									flex: 1,
								}}>
								<Text
									style={{
										color: "#0F172A",
										fontSize: 13,
										fontWeight: "bold",
										marginBottom: 8,
									}}>
									{"Spot Number"}
								</Text>
								<TextInput
									placeholder={"B2"}
									placeholderTextColor="#94A3B8"
									value={textInput2}
									onChangeText={onChangeTextInput2}
									style={{
										color: "#0F172A",
										fontSize: 14,
										fontWeight: "bold",
										backgroundColor: "#FFFFFF",
										borderColor: "#6C63FF",
										borderRadius: 12,
										borderWidth: 2,
										padding: 16,
									}}
								/>
							</View>
						</View>
					</View>
				</View>
				<View
					style={{
						paddingBottom: 16,
						paddingHorizontal: 24,
					}}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: "#ECFDF5",
							borderColor: "#10B9811F",
							borderRadius: 12,
							borderWidth: 1,
							paddingVertical: 12,
							marginBottom: 16,
						}}>
						<View
							style={{
								width: 6,
								height: 6,
								borderRadius: 3,
								backgroundColor: "#10B981",
								marginLeft: 12,
								marginRight: 8,
							}}
						/>
						<Text
							style={{
								color: "#059669",
								fontSize: 13,
							}}>
							{"Order transitions to Complete on submission."}
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => alert('Pressed!')}
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
								{"Confirm & Close Order"}
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
