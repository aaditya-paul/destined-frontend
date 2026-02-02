import {
  borderRadius,
  colors,
  fontFamilies,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
interface CTA_BTNProps {
  text: string;
  onPress?: () => void;
  style?: object;
  btnColor?: string;
  txtColor?: string;
  txtSize?: number;
  btnSize?: {
    width?: number | string;
    height?: number | string;
  };
}
const CTA_BTN = ({
  text,
  onPress,
  btnColor,
  txtColor,
  txtSize,
  btnSize,
  style,
}: CTA_BTNProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Pressable
        onPress={onPress}
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
        <Animated.View
          style={[
            styles.button,
            btnSize ? { width: btnSize.width, height: btnSize.height } : null,
            btnColor ? { backgroundColor: btnColor } : null,
            animatedStyle,
            style,
          ]}
        >
          <Text
            style={[
              styles.text,
              txtColor ? { color: txtColor } : null,
              txtSize ? { fontSize: txtSize } : null,
            ]}
          >
            {text}
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default CTA_BTN;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing["3xl"],
    borderRadius: borderRadius.lg,
    width: "90%",
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.base,
    textAlign: "center",
    fontFamily: fontFamilies.bold,
  },
});
