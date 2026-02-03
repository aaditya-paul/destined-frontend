import { colors, generalSizes } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import * as Haptics from "expo-haptics";

interface ButtonProps {
  onPress: () => void;
  size?: number;
  border?: boolean;
  haptics?: boolean;
}

// Higher Order Component/Internal Base for the animation
const AnimatedPressable = ({
  onPress,
  children,
  style,
  size = generalSizes.lg,
  haptics = true,
}: {
  onPress: () => void;
  children: React.ReactNode;
  style: any;
  size?: number;
  haptics?: boolean;
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.9, {
      duration: 100,
      easing: Easing.ease,
    });
    if (haptics) {
      // Light haptic feedback on press in
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.ease,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

export const PassButton = ({
  onPress,
  size = generalSizes.lg,
  border = true,
  haptics = true,
}: ButtonProps) => (
  <AnimatedPressable
    onPress={onPress}
    style={[
      styles.passBtn,
      { width: size, height: size, borderRadius: size / 2 },
    ]}
    size={size}
    haptics={haptics}
  >
    <Ionicons
      name="close"
      size={Math.floor(size * 0.5)}
      color={colors.secondary}
    />
  </AnimatedPressable>
);

export const LikeButton = ({
  onPress,
  size = generalSizes.lg,
  border = true,
  haptics = true,
}: ButtonProps) => (
  <AnimatedPressable
    onPress={onPress}
    style={[
      styles.likeBtn,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: border ? 2 : 0,
        borderColor: colors.secondary,
      },
    ]}
    size={size}
    haptics={haptics}
  >
    <Ionicons name="heart" size={Math.floor(size * 0.5)} color={colors.white} />
  </AnimatedPressable>
);

const styles = StyleSheet.create({
  passBtn: {
    width: generalSizes.lg,
    height: generalSizes.lg,
    borderRadius: generalSizes.lg / 2,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.secondary,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  likeBtn: {
    width: generalSizes.lg,
    height: generalSizes.lg,
    borderRadius: generalSizes.lg / 2,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
