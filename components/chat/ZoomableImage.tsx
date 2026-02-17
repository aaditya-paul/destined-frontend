import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

interface Props {
  uri: string;
}

/**
 * Pinch-to-zoom + pan + double-tap-to-toggle image viewer.
 * Requires react-native-gesture-handler v2 and react-native-reanimated.
 */
export const ZoomableImage: React.FC<Props> = ({ uri }) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // ── Pinch ────────────────────────────────────────────────────────
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withTiming(1);
        savedScale.value = 1;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else if (scale.value > 5) {
        scale.value = withTiming(5);
        savedScale.value = 5;
      } else {
        savedScale.value = scale.value;
      }
    });

  // ── Pan (only when zoomed in) ────────────────────────────────────
  const panGesture = Gesture.Pan()
    .minPointers(1)
    .onUpdate((e) => {
      if (savedScale.value > 1 || scale.value > 1) {
        translateX.value = savedTranslateX.value + e.translationX;
        translateY.value = savedTranslateY.value + e.translationY;
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // ── Double-tap to zoom / reset ───────────────────────────────────
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1.1) {
        // Reset
        scale.value = withTiming(1);
        savedScale.value = 1;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        // Zoom to 2.5×
        scale.value = withTiming(2.5);
        savedScale.value = 2.5;
      }
    });

  const composed = Gesture.Simultaneous(pinchGesture, panGesture, doubleTap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.Image
        source={{ uri }}
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SCREEN_W,
    height: SCREEN_H * 0.8,
  },
});
