import {
  colors,
  fontFamilies,
  generalSizes,
  spacing,
} from "@/constants/globalStyles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LikeButton } from "./like_unline_actionsBtn";

// --- Components ---

export const EditorialHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <View style={styles.edHeader}>
    <Text style={styles.edTitle}>{title}</Text>
    {subtitle && <Text style={styles.edSubtitle}>{subtitle}</Text>}
    <View style={styles.accentLine} />
  </View>
);

export const LikeableCard = ({
  children,
  onLike,
  hideLikeBtn = false,
  cardContent,
}: {
  children: React.ReactNode;
  onLike?: () => void;
  hideLikeBtn?: boolean;
  cardContent?: React.ReactNode;
}) => (
  <View style={styles.cardWrapper}>
    <View style={styles.cardInner}>{children}</View>
    {!hideLikeBtn && (
      <View style={styles.floatingLikeTab}>
        <LikeButton
          size={generalSizes.xl}
          onPress={() => onLike && onLike()}
          haptics={true}
          border={false}
        />
      </View>
    )}
  </View>
);

export const SectionLabel = ({ text }: { text: string }) => (
  <Text style={styles.sectionLabel}>{text}</Text>
);

// --- Styles ---

export const styles = StyleSheet.create({
  // Editorial Headers
  edHeader: { marginBottom: spacing.lg },
  edTitle: {
    fontSize: 12,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  edSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  accentLine: {
    height: 2,
    width: 30,
    backgroundColor: colors.primary,
    marginTop: 4,
  },

  // Card Styling
  cardWrapper: {
    // marginHorizontal: spacing["2xl"], // Usually handled by parent container
    marginBottom: spacing["3xl"],
    position: "relative",
  },
  cardInner: {
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    // High-end soft shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  floatingLikeTab: { position: "absolute", bottom: -15, right: 15, zIndex: 10 },

  // Labels
  sectionLabel: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 2.5,
    marginBottom: spacing.lg,
    opacity: 0.6,
    paddingHorizontal: spacing.xl,
  },
});
