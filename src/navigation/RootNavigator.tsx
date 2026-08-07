import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverLogin from "../screens/DriverLogin";
import DriverSelectLocation from "../screens/DriverSelectLocation";
import DriverNfcTap from "../screens/DriverNfcTap";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriverLogin" component={DriverLogin} />
      <Stack.Screen name="DriverSelectLocation" component={DriverSelectLocation} />
      <Stack.Screen name="DriverNfcTap" component={DriverNfcTap} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
