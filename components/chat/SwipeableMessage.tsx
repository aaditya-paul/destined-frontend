import { colors } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SWIPE_THRESHOLD = 60;
const MAX_TRANSLATE = 80;

interface Props {
  onReply: () => void;
  children: React.ReactNode;
}

/**
 * WhatsApp-style swipe-to-reply gesture wrapper.
 * Swiping right reveals a reply arrow and triggers `onReply` on release.
 */
export const SwipeableMessage: React.FC<Props> = ({ onReply, children }) => {
  const translateX = useSharedValue(0);
  const hasTriggered = useSharedValue(false);

  const triggerReply = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onReply();
  }, [onReply]);

  const pan = Gesture.Pan()
    .activeOffsetX(15) // don't capture vertical scrolls
    .failOffsetY([-15, 15])
    .onUpdate((e) => {
      // Only allow right swipe
      const x = Math.max(0, Math.min(e.translationX, MAX_TRANSLATE));
      translateX.value = x;

      if (x >= SWIPE_THRESHOLD && !hasTriggered.value) {
        hasTriggered.value = true;
        runOnJS(triggerReply)();
      }
    })
    .onEnd(() => {
      translateX.value = withSpring(0, {
        damping: 28,
        stiffness: 400,
        overshootClamping: true,
      });
      hasTriggered.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: Math.min(translateX.value / SWIPE_THRESHOLD, 1),
    transform: [{ scale: Math.min(translateX.value / SWIPE_THRESHOLD, 1) }],
  }));

  return (
    <View style={styles.wrapper}>
      {/* Reply icon behind the message */}
      <Animated.View style={[styles.replyIcon, iconStyle]}>
        <View style={styles.iconCircle}>
          <Ionicons name="arrow-undo" size={18} color={colors.white} />
        </View>
      </Animated.View>

      <GestureDetector gesture={pan}>
        <Animated.View style={animatedStyle}>{children}</Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  replyIcon: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingLeft: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
