import { colors, fontFamilies } from "@/constants/globalStyles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const DateSeparator: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.container}>
    <View style={styles.line} />
    <Text style={styles.text}>{text}</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 12,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  text: {
    marginHorizontal: 12,
    fontSize: 11,
    fontFamily: fontFamilies.primary.medium,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
});
