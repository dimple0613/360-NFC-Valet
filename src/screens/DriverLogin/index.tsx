import React, {useState} from "react";
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "../../navigation";
type DriverLoginProps = RootStackScreenProps<"DriverLogin">;
export default (props: DriverLoginProps) => {
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
				}}>
				<View 
					style={{
						marginBottom: 254,
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
								color: "#FFFFFF",
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
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/U9397jm9XU/1bfou1v5_expires_30_days.png"}} 
								resizeMode = {"stretch"}
								style={{
									width: 20,
									height: 20,
									marginRight: 8,
								}}
							/>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/U9397jm9XU/dkfmwm0p_expires_30_days.png"}} 
								resizeMode = {"stretch"}
								style={{
									width: 20,
									height: 20,
									marginRight: 8,
								}}
							/>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/U9397jm9XU/oi7nz5m6_expires_30_days.png"}} 
								resizeMode = {"stretch"}
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
						}}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/U9397jm9XU/8heg0q8v_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={{
								borderRadius: 40,
								width: 80,
								height: 80,
								marginBottom: 16,
							}}
						/>
						<View 
							style={{
								alignItems: "center",
								marginBottom: 48,
							}}>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 28,
									fontWeight: "bold",
									marginBottom: 4,
								}}>
								{"360 NFC Valet"}
							</Text>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 12,
									fontWeight: "bold",
								}}>
								{"Premium Hospitality"}
							</Text>
						</View>
					</View>
					<View 
						style={{
							paddingHorizontal: 32,
						}}>
						<View 
							style={{
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#FFFFFF14",
								borderColor: "#FFFFFF33",
								borderRadius: 27,
								borderWidth: 1,
								marginBottom: 16,
							}}>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/U9397jm9XU/midb2dur_expires_30_days.png"}} 
								resizeMode = {"stretch"}
								style={{
									borderRadius: 27,
									width: 20,
									height: 20,
									marginLeft: 20,
									marginRight: 12,
								}}
							/>
							<TextInput
								placeholder={"Valet ID or Email"}
								value={textInput1}
								onChangeText={onChangeTextInput1}
								style={{
									color: "#FFFFFF",
									fontSize: 15,
									marginRight: 4,
									flex: 1,
									paddingVertical: 18,
								}}
							/>
						</View>
						<View 
							style={{
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#FFFFFF14",
								borderColor: "#FFFFFF33",
								borderRadius: 27,
								borderWidth: 1,
								paddingVertical: 17,
								paddingHorizontal: 20,
								marginBottom: 16,
							}}>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/U9397jm9XU/u3t06vr3_expires_30_days.png"}} 
								resizeMode = {"stretch"}
								style={{
									borderRadius: 27,
									width: 20,
									height: 20,
									marginRight: 12,
								}}
							/>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 15,
								}}>
								{"Password"}
							</Text>
							<View 
								style={{
									flex: 1,
								}}>
							</View>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/U9397jm9XU/e7afsc5e_expires_30_days.png"}} 
								resizeMode = {"stretch"}
								style={{
									borderRadius: 27,
									width: 20,
									height: 20,
								}}
							/>
						</View>
						<TouchableOpacity 
							style={{
								alignItems: "center",
								borderRadius: 27,
								paddingVertical: 17,
								marginBottom: 16,
							}} onPress={()=>alert('Pressed!')}>
							<LinearGradient 
								start={{x:0, y:0}}
								end={{x:0, y:1}}
								colors={["#6C63FF", "#7B61FF"]}
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
									color: "#FFFFFF",
									fontSize: 14,
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
					}}>
					<View 
						style={{
							width: 139,
							height: 5,
							backgroundColor: "#FFFFFF",
							borderRadius: 100,
							marginBottom: 8,
						}}>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}