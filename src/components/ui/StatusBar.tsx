import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/theme";
import Svg, { Rect, Path } from "react-native-svg";
import { Typography } from "../../constants";

type StatusBarProps = {
  light?: boolean;
};

const MobileStatusBar = ({ light = false }: StatusBarProps) => {
  const color = light ? "#FFFFFF" : "#1C2B46";

  return null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 26,
    paddingTop: 16,
    paddingBottom: 6,
  },
  time: {
    fontSize: 13,
    fontWeight: Typography.weight.bold,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default MobileStatusBar;
