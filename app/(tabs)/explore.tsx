import { colors } from "@/constants/globalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  text: {
    color: colors.secondary, // Changed from textPrimary which doesn't exist
    fontSize: 20,
    fontFamily: "Manrope",
  },
});
