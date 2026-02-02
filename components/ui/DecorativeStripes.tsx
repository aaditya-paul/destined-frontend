import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

interface DecorativeStripesProps {
  position: "top" | "bottom";
}

const DecorativeStripes: React.FC<DecorativeStripesProps> = ({ position }) => {
  const [mounted, setMounted] = React.useState(false);
  const stripe1 = useSharedValue(200);
  const stripe2 = useSharedValue(200);
  const stripe3 = useSharedValue(200);

  React.useEffect(() => {
    setMounted(true);

    // Use requestAnimationFrame to ensure animations start after mount
    requestAnimationFrame(() => {
      stripe1.value = withDelay(
        100,
        withSpring(0, { damping: 20, stiffness: 90 }),
      );
      stripe2.value = withDelay(
        250,
        withSpring(0, { damping: 20, stiffness: 90 }),
      );
      stripe3.value = withDelay(
        400,
        withSpring(0, { damping: 20, stiffness: 90 }),
      );
    });
  }, []);

  const stripe1Style = useAnimatedStyle(() => ({
    transform: [{ rotate: "35deg" }, { translateX: stripe1.value }],
  }));

  const stripe2Style = useAnimatedStyle(() => ({
    transform: [{ rotate: "35deg" }, { translateX: stripe2.value }],
  }));

  const stripe3Style = useAnimatedStyle(() => ({
    transform: [{ rotate: "35deg" }, { translateX: stripe3.value }],
  }));

  const containerStyle =
    position === "top"
      ? styles.stripeTopContainer
      : styles.stripeBottomContainer;

  if (!mounted) return null;

  return (
    <View style={containerStyle}>
      <Animated.View style={[styles.stripeOne, stripe1Style]} />
      <Animated.View style={[styles.stripeTwo, stripe2Style]} />
      <Animated.View style={[styles.stripeThree, stripe3Style]} />
    </View>
  );
};

export default DecorativeStripes;

const styles = StyleSheet.create({
  stripeTopContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  stripeBottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    transform: [{ rotate: "180deg" }],
  },
  stripeOne: {
    position: "absolute",
    top: -100,
    right: 0,
    width: 20,
    height: 200,
    backgroundColor: "#ff6347c4",
    borderRadius: 20,
  },
  stripeTwo: {
    position: "absolute",
    top: -50,
    right: 10,
    width: 20,
    height: 250,
    backgroundColor: "#ff6347c4",
    borderRadius: 20,
  },
  stripeThree: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 20,
    height: 200,
    backgroundColor: "#ff6347c4",
    borderRadius: 20,
  },
});
