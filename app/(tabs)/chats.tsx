import { colors } from "@/constants/globalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chats</Text>
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
    color: colors.secondary, // Changed from textPrimary
    fontSize: 20,
    fontFamily: "Manrope",
  },
});
