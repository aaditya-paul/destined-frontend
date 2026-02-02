import CTA_BTN from "@/components/ui/Cta_btn";
import DecorativeStripes from "@/components/ui/DecorativeStripes";
import LogoBranding from "@/components/ui/LogoBranding";
import {
  colors,
  fontFamilies,
  fontSizes,
  lineHeights,
  spacing,
} from "@/constants/globalStyles";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LoginScreen = () => {
  const router = useRouter();

  const handleSignIn = () => {
    // TODO: Add sign-in logic when backend is ready
    console.log("Sign in pressed");
    // For now, navigate to onboarding flow
    router.push("/onboarding/basic-identity");
  };

  return (
    <View style={styles.container}>
      {/* Decorative Stripes */}
      <DecorativeStripes position="top" />
      <DecorativeStripes position="bottom" />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo and Branding */}
        <LogoBranding showOnlyLogo />

        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeSubtitle}>
            Sign in to find your perfect match
          </Text>
        </View>

        {/* Sign In Button */}
        <View style={styles.buttonContainer}>
          <CTA_BTN
            btnColor={colors.secondary}
            text="Continue with Google"
            onPress={handleSignIn}
          />
        </View>

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{"\n"}
          <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing["2xl"],
    width: "100%",
    gap: 40,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: spacing.xl,
  },
  welcomeTitle: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    marginBottom: spacing.sm,
  },
  welcomeSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: lineHeights.base,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 350,
    marginTop: spacing.xl,
  },
  termsText: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: lineHeights.sm,
    marginTop: spacing.xl,
  },
  termsLink: {
    color: colors.secondary,
    fontWeight: "600",
  },
});
