import React, { useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
type DriverPickupRequestsProps = RootStackScreenProps<"DriverPickupRequests">;
type Tab = "pending" | "in_progress" | "completed";
const tabs: { key: Tab; label: string }[] = [
	{ key: "pending", label: "Pending (3)" },
	{ key: "in_progress", label: "In Progress" },
	{ key: "completed", label: "Completed" },
];
type Request = {
	id: string;
	car: string;
	plate: string;
	nfc: string;
	spot: string;
	color: string;
	colorHex: string;
	timeRemaining: string;
	timerColor: string;
	timerBg: string;
};
const requests: Request[] = [
	{
		id: "1",
		car: "Mercedes-Benz S-Class",
		plate: "KSA-9082",
		nfc: "#9841-A",
		spot: "B2",
		color: "#1E2937",
		colorHex: "#1E2937",
		timeRemaining: "03:45 remaining",
		timerColor: "#EF4444",
		timerBg: "rgba(239, 68, 68, 0.08)",
	},
	{
		id: "2",
		car: "Lexus LS 500",
		plate: "UAE-7741",
		nfc: "#4110-C",
		spot: "A3",
		color: "#E2E8F0",
		colorHex: "#E2E8F0",
		timeRemaining: "08:12 remaining",
		timerColor: "#F59E0B",
		timerBg: "rgba(245, 158, 11, 0.08)",
	},
	{
		id: "3",
		car: "Porsche Taycan",
		plate: "KSA-3005",
		nfc: "#1289-F",
		spot: "C1",
		color: "#1E3A8A",
		colorHex: "#1E3A8A",
		timeRemaining: "14:55 remaining",
		timerColor: "#10B981",
		timerBg: "rgba(16, 185, 129, 0.06)",
	},
];
export default (props: DriverPickupRequestsProps) => {
	const [activeTab, setActiveTab] = useState<Tab>("pending");
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
						alignSelf: "stretch",
						flexDirection: "column",
					}}>
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
						colors={["#2E0F54", "#0F103F"]}
						style={{
							borderBottomRightRadius: 24,
							borderBottomLeftRadius: 24,
							paddingTop: 12,
							paddingBottom: 28,
							paddingHorizontal: 24,
							gap: 12,
						}}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<TouchableOpacity
								onPress={() => props.navigation.goBack()}
								style={{
									width: 36,
									height: 32,
									backgroundColor: "rgba(255, 255, 255, 0.08)",
									borderRadius: 18,
									borderWidth: 1,
									borderColor: "rgba(255, 255, 255, 0.20)",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Image
									source={require("../../../assets/icon-back.png")}
									resizeMode={"contain"}
									style={{
										width: 16,
										height: 16,
										tintColor: "#FFFFFF",
									}}
								/>
							</TouchableOpacity>
							<Text
								style={{
									color: "#FFFFFF",
									fontSize: 18,
									fontWeight: "700",
								}}>
								{"Pickup Requests"}
							</Text>
							<View
								style={{
									backgroundColor: "#EF4444",
									borderRadius: 12,
									paddingVertical: 4,
									paddingHorizontal: 10,
								}}>
								<Text
									style={{
										color: "#FFFFFF",
										fontSize: 12,
										fontWeight: "800",
									}}>
									{"3 New"}
								</Text>
							</View>
						</View>
						<Text
							style={{
								color: "#FFFFFF",
								fontSize: 13,
								fontWeight: "500",
								opacity: 0.7,
							}}>
							{"Manage active customer retrieval requests"}
						</Text>
					</LinearGradient>
				</View>
				<View
					style={{
						paddingHorizontal: 24,
						marginTop: 16,
						gap: 16,
					}}>
					<View
						style={{
							height: 44,
							backgroundColor: "#FFFFFF",
							borderRadius: 24,
							borderWidth: 1,
							borderColor: "#E2E8F0",
							padding: 4,
							flexDirection: "row",
						}}>
						{tabs.map((tab) => (
							<TouchableOpacity
								key={tab.key}
								onPress={() => setActiveTab(tab.key)}
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 20,
									backgroundColor:
										activeTab === tab.key
											? "transparent"
											: "transparent",
								}}>
								{activeTab === tab.key ? (
									<LinearGradient
										start={{ x: 0, y: 0.5 }}
										end={{ x: 1, y: 0.5 }}
										colors={["#6C63FF", "#7B61FF"]}
										style={{
											flex: 1,
											borderRadius: 20,
											alignItems: "center",
											justifyContent: "center",
											alignSelf: "stretch",
										}}>
										<Text
											style={{
												color: "#FFFFFF",
												fontSize: 13,
												fontWeight: "700",
											}}>
											{tab.label}
										</Text>
									</LinearGradient>
								) : (
									<Text
										style={{
											color: "#64748B",
											fontSize: 13,
											fontWeight: "600",
										}}>
										{tab.label}
									</Text>
								)}
							</TouchableOpacity>
						))}
					</View>
					<View style={{ gap: 12 }}>
						{requests.map((req) => (
							<View
								key={req.id}
								style={{
									backgroundColor: "#FFFFFF",
									borderRadius: 16,
									borderWidth: 1,
									borderColor: "#E2E8F0",
									padding: 16,
									shadowColor: "#0F172A",
									shadowOpacity: 0.02,
									shadowOffset: {
									    width: 0,
									    height: 4,
									},
									shadowRadius: 8,
									elevation: 2,
									gap: 12,
								}}>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}>
									<View
										style={{
											backgroundColor: req.timerBg,
											borderRadius: 12,
											paddingVertical: 4,
											paddingHorizontal: 10,
										}}>
										<Text
											style={{
												color: req.timerColor,
												fontSize: 12,
												fontWeight: "800",
											}}>
											{req.timeRemaining}
										</Text>
									</View>
									<Text
										style={{
											color: "#6C63FF",
											fontSize: 13,
											fontWeight: "700",
										}}>
										{"Spot " + req.spot}
									</Text>
								</View>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 12,
									}}>
									<View
										style={{
											width: 16,
											height: 16,
											backgroundColor: req.colorHex,
											borderRadius: 9999,
											borderWidth: 1,
											borderColor: "#E2E8F0",
										}}
									/>
									<View style={{ flex: 1, gap: 2 }}>
										<Text
											style={{
												color: "#0F172A",
												fontSize: 15,
												fontWeight: "800",
											}}>
											{req.car}
										</Text>
										<Text
											style={{
												color: "#64748B",
												fontSize: 12,
												fontWeight: "400",
											}}>
											{"Plate: " + req.plate + " \u2022 NFC: " + req.nfc}
										</Text>
									</View>
								</View>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}>
									<TouchableOpacity
										activeOpacity={0.8}
										style={{
											backgroundColor: "#6C63FF",
											borderRadius: 16,
											paddingVertical: 8,
											paddingHorizontal: 24,
										}}>
										<Text
											style={{
												color: "#FFFFFF",
												fontSize: 13,
												fontWeight: "700",
											}}>
											{"Accept Pickup"}
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={0.8}
										style={{
											flexDirection: "row",
											alignItems: "center",
											gap: 4,
										}}>
										<Text
											style={{
												color: "#64748B",
												fontSize: 13,
												fontWeight: "600",
											}}>
											{"View Info"}
										</Text>
										<View
											style={{
												width: 12,
												height: 12,
											}}>
											<View
												style={{
													width: 6,
													height: 6,
													borderWidth: 2,
													borderColor: "#64748B",
													borderRadius: 3,
													position: "absolute",
													left: 3,
													top: 3,
												}}
											/>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						))}
					</View>
				</View>
			</ScrollView>
			<View>
				<View
					style={{
						alignSelf: "stretch",
						marginHorizontal: 24,
						marginBottom: -96,
						backgroundColor: "#0F172A",
						borderRadius: 16,
						paddingVertical: 12,
						paddingHorizontal: 16,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						shadowColor: "#000000",
						shadowOpacity: 0.25,
						shadowOffset: {
						    width: 0,
						    height: 8,
						},
						shadowRadius: 24,
						elevation: 8,
					}}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 12,
						}}>
						<View
							style={{
								width: 8,
								height: 8,
								backgroundColor: "#6C63FF",
								borderRadius: 9999,
							}}
						/>
						<Text
							style={{
								color: "#FFFFFF",
								fontSize: 13,
								fontWeight: "600",
							}}>
							{"New high-priority pickup requested"}
						</Text>
					</View>
					<Text
						style={{
							color: "#6C63FF",
							fontSize: 11,
							fontWeight: "800",
							textTransform: "uppercase",
						}}>
						{"View"}
					</Text>
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
							backgroundColor: "#0F172A",
							borderRadius: 100,
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};
