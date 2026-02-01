import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { MICROCOPY } from "@/constants/microcopies";
import CTA_BTN from "@/components/ui/Cta_btn";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from "react-native-reanimated";

const index = () => {
  const topStripe1 = useSharedValue(200);
  const topStripe2 = useSharedValue(200);
  const topStripe3 = useSharedValue(200);
  const bottomStripe1 = useSharedValue(200);
  const bottomStripe2 = useSharedValue(200);
  const bottomStripe3 = useSharedValue(200);

  useEffect(() => {
    // Animate top stripes one by one
    topStripe1.value = withDelay(
      100,
      withSpring(0, { damping: 20, stiffness: 90 }),
    );
    topStripe2.value = withDelay(
      250,
      withSpring(0, { damping: 20, stiffness: 90 }),
    );
    topStripe3.value = withDelay(
      400,
      withSpring(0, { damping: 20, stiffness: 90 }),
    );

    // Animate bottom stripes one by one
    bottomStripe1.value = withDelay(
      100,
      withSpring(0, { damping: 20, stiffness: 90 }),
    );
    bottomStripe2.value = withDelay(
      250,
      withSpring(0, { damping: 20, stiffness: 90 }),
    );
    bottomStripe3.value = withDelay(
      400,
      withSpring(0, { damping: 20, stiffness: 90 }),
    );
  }, []);

  const topStripe1Style = useAnimatedStyle(() => ({
    transform: [{ rotate: "35deg" }, { translateX: topStripe1.value }],
  }));

  const topStripe2Style = useAnimatedStyle(() => ({
    transform: [{ rotate: "35deg" }, { translateX: topStripe2.value }],
  }));

  const topStripe3Style = useAnimatedStyle(() => ({
    transform: [{ rotate: "35deg" }, { translateX: topStripe3.value }],
  }));

  const bottomStripe1Style = useAnimatedStyle(() => ({
    transform: [{ rotate: "35deg" }, { translateX: bottomStripe1.value }],
  }));

  const bottomStripe2Style = useAnimatedStyle(() => ({
    transform: [{ rotate: "35deg" }, { translateX: bottomStripe2.value }],
  }));

  const bottomStripe3Style = useAnimatedStyle(() => ({
    transform: [{ rotate: "35deg" }, { translateX: bottomStripe3.value }],
  }));

  return (
    <View style={styles.container}>
      {/* stripes */}
      <View style={styles.stripe_top_container}>
        <Animated.View
          style={[styles.stripe_one, topStripe1Style]}
        ></Animated.View>
        <Animated.View
          style={[styles.stripe_two, topStripe2Style]}
        ></Animated.View>
        <Animated.View
          style={[styles.stripe_three, topStripe3Style]}
        ></Animated.View>
      </View>
      <View style={styles.stripe_bottom_container}>
        <Animated.View
          style={[styles.stripe_one, bottomStripe1Style]}
        ></Animated.View>
        <Animated.View
          style={[styles.stripe_two, bottomStripe2Style]}
        ></Animated.View>
        <Animated.View
          style={[styles.stripe_three, bottomStripe3Style]}
        ></Animated.View>
      </View>
      {/* logo and branding */}
      <View style={styles.branding}>
        <Image
          style={styles.logo}
          source={require("@/assets/destined_logo_undecided.png")}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.title, { fontSize: 36 }]}>Destined </Text>
          <Text
            style={[
              styles.title,
              { fontSize: 16, marginTop: 5, opacity: 0.8, color: "#8A8A8A" },
            ]}
          >
            the dating app
          </Text>
        </View>
      </View>
      {/* cta */}
      <View style={{ width: "100%", position: "absolute", bottom: 50 }}>
        <CTA_BTN text={MICROCOPY.splash.cta} />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  // stripes: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   height: "30%",
  //   backgroundColor: "#FF6347",
  //   borderBottomLeftRadius: 170,
  //   borderBottomRightRadius: 170,
  // },
  stripe_top_container: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  stripe_bottom_container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    transform: [{ rotate: "180deg" }],
  },
  stripe_one: {
    position: "absolute",
    top: -100,
    right: 0,
    width: 20,
    height: 200,
    backgroundColor: "#ff6347c4",
    borderRadius: 20,
  },
  stripe_two: {
    position: "absolute",
    top: -50,
    right: 10,
    width: 20,
    height: 250,
    backgroundColor: "#ff6347c4",
    borderRadius: 20,
  },
  stripe_three: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 20,
    height: 200,
    backgroundColor: "#ff6347c4",
    borderRadius: 20,
  },
  container: {
    backgroundColor: "#F5EFE6",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    // fontWeight: "bold",
    fontFamily: "ZonaPro-Bold",
    // color: "#ff4365",
    // color: "#FF6347",
    color: "#1E3A5F",
  },
  branding: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
});
