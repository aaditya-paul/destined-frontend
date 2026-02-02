import {
  buttonDimensions,
  colors,
  fontFamilies,
  fontSizes,
  opacity,
  spacing,
} from "@/constants/globalStyles";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface LogoBrandingProps {
  showTagline?: boolean;
  showOnlyLogo?: boolean;
}

const LogoBranding = ({
  showTagline = true,
  showOnlyLogo = false,
}: LogoBrandingProps) => {
  return (
    <View style={styles.branding}>
      <Image
        style={styles.logo}
        source={require("@/assets/images/destined_small_logo.png")}
      />
      <View style={{ alignItems: "center" }}>
        {showOnlyLogo ? null : (
          <Text style={[styles.title, { fontSize: fontSizes["2xl"] }]}>
            Destined
          </Text>
        )}
        {showTagline && !showOnlyLogo && (
          <Text
            style={[
              styles.title,
              {
                fontSize: fontSizes.sm,
                marginTop: spacing.md,
                opacity: opacity.disabled,
                color: colors.textSecondary,
              },
            ]}
          >
            the dating app
          </Text>
        )}
      </View>
    </View>
  );
};

export default LogoBranding;

const styles = StyleSheet.create({
  branding: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: buttonDimensions.logo.width,
    height: buttonDimensions.logo.height,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
  },
});
