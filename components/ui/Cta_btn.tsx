import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const CTA_BTN = ({ text }: { text: string }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Pressable
        onPressIn={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          scale.value = withSpring(0.96, {
            damping: 20,
            stiffness: 200,
            mass: 1,
          });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, {
            damping: 20,
            stiffness: 200,
            mass: 1,
          });
        }}
      >
        <Animated.View style={[styles.button, animatedStyle]}>
          <Text style={styles.text}>{text}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default CTA_BTN;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6347",
    // backgroundColor: "#FF8A5B",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "90%",
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "ZonaPro-Bold",
  },
});
