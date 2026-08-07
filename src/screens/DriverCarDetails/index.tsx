import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
type DriverCarDetailsProps = RootStackScreenProps<"DriverCarDetails">;
export default (props: DriverCarDetailsProps) => {
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
						marginBottom: 215,
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
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							borderBottomRightRadius: 24,
							borderBottomLeftRadius: 24,
							paddingTop: 20,
							paddingBottom: 32,
							paddingHorizontal: 24,
						}}>
						<TouchableOpacity onPress={() => props.navigation.goBack()}>
							<Image
								source={require("../../../assets/icon-chevron.png")}
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
							{"New Ticket Setup"}
						</Text>
						<View
							style={{
								backgroundColor: "#10B981",
								borderRadius: 12,
								paddingVertical: 3,
								paddingHorizontal: 10,
							}}>
							<Text
								style={{
									color: "#FFFFFF",
									fontSize: 12,
									fontWeight: "bold",
								}}>
								{"Tag Linked"}
							</Text>
						</View>
					</LinearGradient>
					<View
						style={{
							paddingTop: 24,
							paddingHorizontal: 24,
						}}>
						<View
							style={{
								backgroundColor: "#FFFFFF",
								borderColor: "#E2E8F0",
								borderRadius: 16,
								borderWidth: 1,
								paddingVertical: 16,
								paddingLeft: 16,
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
							<Text
								style={{
									color: "#64748B",
									fontSize: 12,
									fontWeight: "bold",
									marginBottom: 4,
								}}>
								{"Linked NFC UID"}
							</Text>
							<Text
								style={{
									color: "#6C63FF",
									fontSize: 20,
									fontWeight: "bold",
								}}>
								{"# 9841-A"}
							</Text>
						</View>
						<View
							style={{
								marginBottom: 20,
							}}>
							<Text
								style={{
									color: "#0F172A",
									fontSize: 13,
									fontWeight: "bold",
									marginBottom: 8,
								}}>
								{"Plate Number"}
							</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									backgroundColor: "#FFFFFF",
									borderColor: "#E2E8F0",
									borderRadius: 12,
									borderWidth: 1,
									paddingVertical: 9,
									paddingHorizontal: 16,
								}}>
								<Text
									style={{
										color: "#0F172A",
										fontSize: 15,
										fontWeight: "bold",
									}}>
									{"KSA-9082"}
								</Text>
								<Image
									source={require("../../../assets/icon-camera.png")}
									resizeMode={"stretch"}
									style={{
										borderRadius: 8,
										width: 32,
										height: 32,
									}}
								/>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginBottom: 20,
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
									{"Make"}
								</Text>
								<TouchableOpacity
									style={{
										alignSelf: "flex-start",
										flexDirection: "row",
										alignItems: "center",
										backgroundColor: "#FFFFFF",
										borderColor: "#E2E8F0",
										borderRadius: 12,
										borderWidth: 1,
										padding: 16,
									}}
									onPress={() => alert('Pressed!')}
									activeOpacity={0.8}>
									<Text
										style={{
											color: "#0F172A",
											fontSize: 14,
											marginRight: 16,
										}}>
										{"Mercedes-Benz"}
									</Text>
									<Image
										source={require("../../../assets/icon-chevron-down.png")}
										resizeMode={"stretch"}
										style={{
											borderRadius: 12,
											width: 14,
											height: 14,
										}}
									/>
								</TouchableOpacity>
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
									{"Model"}
								</Text>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
										backgroundColor: "#FFFFFF",
										borderColor: "#E2E8F0",
										borderRadius: 12,
										borderWidth: 1,
										padding: 16,
									}}>
									<Text
										style={{
											color: "#0F172A",
											fontSize: 14,
										}}>
										{"S-Class"}
									</Text>
									<Image
										source={require("../../../assets/icon-chevron-down.png")}
										resizeMode={"stretch"}
										style={{
											borderRadius: 12,
											width: 14,
											height: 14,
										}}
									/>
								</View>
							</View>
						</View>
						<View>
							<Text
								style={{
									color: "#0F172A",
									fontSize: 13,
									fontWeight: "bold",
									marginBottom: 8,
								}}>
								{"Color"}
							</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									backgroundColor: "#FFFFFF",
									borderColor: "#E2E8F0",
									borderRadius: 12,
									borderWidth: 1,
									paddingVertical: 15,
									paddingHorizontal: 16,
								}}>
								<Image
									source={require("../../../assets/icon-color.png")}
									resizeMode={"stretch"}
									style={{
										borderRadius: 12,
										width: 20,
										height: 20,
										marginRight: 12,
									}}
								/>
								<Text
									style={{
										color: "#0F172A",
										fontSize: 14,
									}}>
									{"Obsidian Black Metallic"}
								</Text>
								<View
									style={{
										flex: 1,
									}}>
								</View>
								<Image
									source={require("../../../assets/icon-chevron-down.png")}
									resizeMode={"stretch"}
									style={{
										borderRadius: 12,
										width: 14,
										height: 14,
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
								{"Validate & Assign Card"}
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
