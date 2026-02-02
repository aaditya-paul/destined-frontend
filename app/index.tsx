import CTA_BTN from "@/components/ui/Cta_btn";
import DecorativeStripes from "@/components/ui/DecorativeStripes";
import LogoBranding from "@/components/ui/LogoBranding";
import { MICROCOPY } from "@/constants/microcopies";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const Index = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };

  useEffect(() => {
    console.log("Mounted");
  }, []);
  return (
    <View style={styles.container}>
      {/* Decorative Stripes */}
      <DecorativeStripes position="top" />
      <DecorativeStripes position="bottom" />

      {/* Logo and Branding */}
      <LogoBranding showTagline={true} />

      {/* CTA Button */}
      <View style={{ width: "100%", position: "absolute", bottom: 50 }}>
        <CTA_BTN text={MICROCOPY.splash.cta} onPress={handleGetStarted} />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5EFE6",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
