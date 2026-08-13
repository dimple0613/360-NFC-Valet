import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import { Typography } from "../../constants";

type StatusBarProps = {
  light?: boolean;
};

const MobileStatusBar = ({ light = false }: StatusBarProps) => {
  const color = light ? "#FFFFFF" : "#1C2B46";

  return (
    <View style={styles.container}>
      <Text style={[styles.time, { color }]}>9:41</Text>
      <View style={styles.icons}>
        <Svg width="16" height="11" viewBox="0 0 16 11" fill={color}>
          <Rect x="0" y="6" width="3" height="5" rx="1" />
          <Rect x="4.5" y="4" width="3" height="7" rx="1" />
          <Rect x="9" y="1.5" width="3" height="9.5" rx="1" />
        </Svg>
        <Svg width="22" height="11" viewBox="0 0 22 11">
          <Rect
            x="0.5"
            y="0.5"
            width="18"
            height="10"
            rx="3"
            fill="none"
            stroke={color}
          />
          <Rect x="2.5" y="2.5" width="12" height="6" rx="1.5" fill={color} />
          <Rect x="20" y="3.5" width="1.6" height="4" rx="0.8" fill={color} />
        </Svg>
      </View>
    </View>
  );
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
