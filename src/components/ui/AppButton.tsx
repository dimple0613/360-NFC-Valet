import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography } from "../../constants";

type AppButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

const AppButton = ({ label, onPress, disabled = false }: AppButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{ alignItems: "center", marginBottom: Spacing.lg }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={
          disabled
            ? [Colors.border, Colors.border]
            : [Colors.primary, Colors.secondary]
        }
        style={{
          alignSelf: "stretch",
          alignItems: "center",
          borderRadius: 27,
          paddingVertical: 17,
        }}
      >
        <Text
          style={{
            color: Colors.text.primary,
            fontSize: Typography.size.lg,
            fontWeight: Typography.weight.bold,
          }}
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AppButton;
