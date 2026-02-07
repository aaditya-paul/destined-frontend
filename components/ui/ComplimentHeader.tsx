import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ComplimentHeaderProps {
  compliment: string;
}

export const ComplimentHeader: React.FC<ComplimentHeaderProps> = ({
  compliment,
}) => {
  return (
    <View style={styles.complimentHeader}>
      <View style={styles.complimentBadge}>
        <Ionicons name="chatbubble-ellipses" size={16} color={colors.white} />
        <Text style={styles.complimentBadgeText}>Sent you a compliment</Text>
      </View>
      <Text style={styles.complimentText}>"{compliment}"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  complimentHeader: {
    marginTop: 80, // Space for close button
    marginHorizontal: spacing.xl,
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 20,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  complimentBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    marginBottom: spacing.sm,
  },
  complimentBadgeText: {
    color: colors.white,
    fontFamily: fontFamilies.bold,
    fontSize: 10,
    textTransform: "uppercase",
  },
  complimentText: {
    fontFamily: fontFamilies.primary.medium,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
});
