import React from "react";
import { Text as RNText, TextInput as RNTextInput, StyleSheet, StyleProp, TextStyle } from "react-native";
import { Typography } from "../constants/typography";

function resolveFontFamily(style?: StyleProp<TextStyle>): string {
  const flat = StyleSheet.flatten(style) ?? {};
  return Typography.font(flat.fontWeight as string | undefined);
}

export function Text({ style, ...props }: React.ComponentProps<typeof RNText>) {
  return <RNText style={[{ fontFamily: resolveFontFamily(style) }, style]} {...props} />;
}

export function TextInput({ style, ...props }: React.ComponentProps<typeof RNTextInput>) {
  return <RNTextInput style={[{ fontFamily: resolveFontFamily(style) }, style]} {...props} />;
}
