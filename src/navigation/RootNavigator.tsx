import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverLogin from "../screens/DriverLogin";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriverLogin" component={DriverLogin} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
