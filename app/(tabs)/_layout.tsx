import { colors } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";

const TabIcon = ({
  name,
  focused,
  color,
}: {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  color: string;
}) => {
  if (focused) {
    return (
      <View style={styles.activeTabContainer}>
        <View style={styles.activeTabBubble}>
          <Ionicons name={name} size={28} color={colors.white} />
        </View>
      </View>
    );
  }
  return <Ionicons name={name} size={24} color={color} />;
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background, // Match screen background for seamless look or use white
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === "ios" ? 90 : 70, // Increased height for floating effect
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          position: "absolute",
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              name={focused ? "person" : "person-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              name={focused ? "compass" : "compass-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: "Likes",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              name={focused ? "heart" : "heart-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              name={focused ? "chatbubble" : "chatbubble-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeTabContainer: {
    position: "absolute",
    top: -24, // Raise the bubble above the bar
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabBubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    // Shadow for "raised" effect
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    // White border for "cutout" effect against the background
    borderWidth: 4,
    borderColor: colors.background,
  },
});
