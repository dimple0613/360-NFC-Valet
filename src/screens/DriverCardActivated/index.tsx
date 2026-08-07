import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
type DriverCardActivatedProps = RootStackScreenProps<"DriverCardActivated">;
export default (props: DriverCardActivatedProps) => {
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
						flex: 1,
						justifyContent: "space-between",
					}}>
					<View
						style={{
							flexDirection: "column",
							alignItems: "center",
							paddingTop: 40,
							paddingBottom: 24,
							paddingHorizontal: 24,
							gap: 20,
						}}>
						<View
							style={{
								width: 80,
								height: 80,
								backgroundColor: "#10B981",
								borderRadius: 40,
								alignItems: "center",
								justifyContent: "center",
								shadowColor: "#10B981",
								shadowOpacity: 0.25,
								shadowOffset: {
								    width: 0,
								    height: 8,
								},
								shadowRadius: 20,
								elevation: 8,
							}}>
							<Image
								source={require("../../../assets/icon-car.png")}
								resizeMode={"contain"}
								style={{
									width: 36,
									height: 36,
									tintColor: "#FFFFFF",
								}}
							/>
						</View>
						<View
							style={{
								alignItems: "center",
								gap: 6,
							}}>
							<Text
								style={{
									textAlign: "center",
									color: "#0F172A",
									fontSize: 22,
									fontWeight: "800",
								}}>
								{"Card Activated!"}
							</Text>
							<Text
								style={{
									textAlign: "center",
									color: "#64748B",
									fontSize: 14,
									fontWeight: "400",
								}}>
								{"Tag linked to vehicle successfully"}
							</Text>
						</View>
					</View>
					<View
						style={{
							paddingHorizontal: 24,
						}}>
						<View
							style={{
								backgroundColor: "#FFFFFF",
								borderRadius: 16,
								padding: 20,
								shadowColor: "#0F172A",
								shadowOpacity: 0.03,
								shadowOffset: {
								    width: 0,
								    height: 4,
								},
								shadowRadius: 12,
								elevation: 4,
								borderWidth: 1,
								borderColor: "#E2E8F0",
								gap: 16,
							}}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}>
								<Text
									style={{
										color: "#64748B",
										fontSize: 12,
										fontWeight: "700",
										textTransform: "uppercase",
									}}>
									{"Active Pass Details"}
								</Text>
								<Text
									style={{
										color: "#6C63FF",
										fontSize: 14,
										fontWeight: "800",
									}}>
									{"ID: 9841-A"}
								</Text>
							</View>
							<View
								style={{
									height: 0,
									borderWidth: 1,
									borderColor: "#E2E8F0",
								}}
							/>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 16,
								}}>
								<View
									style={{
										width: 40,
										height: 40,
										backgroundColor: "#F1F5F9",
										borderRadius: 10,
										alignItems: "center",
										justifyContent: "center",
									}}>
									<Image
										source={require("../../../assets/icon-car.png")}
										resizeMode={"contain"}
										style={{
											width: 20,
											height: 20,
										}}
									/>
								</View>
								<View
									style={{
										flex: 1,
										gap: 2,
									}}>
									<Text
										style={{
											color: "#0F172A",
											fontSize: 16,
											fontWeight: "700",
										}}>
										{"Mercedes-Benz S-Class"}
									</Text>
									<Text
										style={{
											color: "#64748B",
											fontSize: 13,
											fontWeight: "400",
										}}>
										{"Obsidian Black \u2022 KSA-9082"}
									</Text>
								</View>
							</View>
							<View
								style={{
									height: 0,
									borderWidth: 1,
									borderColor: "#E2E8F0",
								}}
							/>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
								}}>
								<View
									style={{
										gap: 2,
									}}>
									<Text
										style={{
											color: "#64748B",
											fontSize: 11,
											fontWeight: "400",
											textTransform: "uppercase",
										}}>
										{"Venue"}
									</Text>
									<Text
										style={{
											color: "#0F172A",
											fontSize: 13,
											fontWeight: "600",
										}}>
										{"Ritz-Carlton"}
									</Text>
								</View>
								<View
									style={{
										alignItems: "flex-end",
										gap: 2,
									}}>
									<Text
										style={{
											color: "#64748B",
											fontSize: 11,
											fontWeight: "400",
											textTransform: "uppercase",
										}}>
										{"Linked At"}
									</Text>
									<Text
										style={{
											color: "#0F172A",
											fontSize: 13,
											fontWeight: "600",
										}}>
										{"09:41 AM"}
									</Text>
								</View>
							</View>
						</View>
					</View>
					<View
						style={{
							paddingTop: 24,
							paddingHorizontal: 32,
							alignItems: "center",
							gap: 8,
						}}>
						<Text
							style={{
								textAlign: "center",
								color: "#64748B",
								fontSize: 14,
								fontWeight: "600",
							}}>
							{"Next Step"}
						</Text>
						<Text
							style={{
								textAlign: "center",
								color: "#0F172A",
								fontSize: 15,
								fontWeight: "700",
							}}>
							{"Hand over the physical NFC card to the customer."}
						</Text>
					</View>
				</View>
			</ScrollView>
			<View
				style={{
					paddingBottom: 16,
					paddingHorizontal: 24,
					gap: 12,
				}}>
				<TouchableOpacity
					onPress={() => props.navigation.navigate("DriverUpdateParking")}
					activeOpacity={0.8}>
					<LinearGradient
						start={{ x: 0, y: 0.5 }}
						end={{ x: 1, y: 0.5 }}
						colors={["#6C63FF", "#7B61FF"]}
						style={{
							height: 54,
							borderRadius: 27,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Text
							style={{
								color: "#FFFFFF",
								fontSize: 16,
								fontWeight: "700",
							}}>
							{"Update Parking Slot"}
						</Text>
					</LinearGradient>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => props.navigation.popToTop()}
					activeOpacity={0.8}
					style={{
						height: 54,
						borderRadius: 27,
						borderWidth: 1,
						borderColor: "#E2E8F0",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Text
						style={{
							color: "#64748B",
							fontSize: 16,
							fontWeight: "700",
						}}>
						{"Back to Shift Home"}
					</Text>
				</TouchableOpacity>
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
							backgroundColor: "#0F172A",
							borderRadius: 100,
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};
