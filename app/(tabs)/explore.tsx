import { EditorialHeader } from "@/components/ui/EditorialComponents";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { dummyProfiles } from "@/data/dummyData";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
// Optimized column width calculation to prevent overflow
const COLUMN_WIDTH = (width - spacing.xl * 2 - spacing.md) / 2;

export default function ExploreScreen() {
  const router = useRouter();
  const leftColumn = dummyProfiles.filter((_, i) => i % 2 === 0);
  const rightColumn = dummyProfiles.filter((_, i) => i % 2 !== 0);

  const ExploreCard = ({
    profile,
    height,
    index,
  }: {
    profile: (typeof dummyProfiles)[0];
    height: number;
    index: number;
  }) => {
    // Generate a random match percentage for demo
    const matchPercentage = 85 + (index % 15);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.card, { height }]}
        onPress={() =>
          router.push({ pathname: "/user-profile", params: { id: index } })
        }
      >
        <Image
          source={{ uri: profile.images[0]?.uri }}
          style={styles.cardImage}
        />

        {/* Match Badge */}
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{matchPercentage}% MATCH</Text>
        </View>

        {/* Gradient Overlay for depth */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={styles.gradientOverlay}
        />

        {/* Glassmorphism Details Section */}
        <BlurView intensity={80} tint="dark" style={styles.glassInfo}>
          <View>
            <Text style={styles.cardName}>
              {profile.firstName},{" "}
              {new Date().getFullYear() - profile.dateOfBirth.getFullYear()}
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={10} color={colors.white} />
              <Text style={styles.cardLocation} numberOfLines={1}>
                {profile.location}
              </Text>
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EditorialHeader title="EXPLORE" subtitle="Curated vibes & matches." />
        {/* <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color={colors.secondary} />
        </TouchableOpacity> */}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.masonryContainer}>
          <View style={styles.column}>
            {leftColumn.map((profile, index) => (
              <ExploreCard
                key={index}
                profile={profile}
                height={index % 2 === 0 ? 260 : 320} // Slightly taller for more elegance
                index={dummyProfiles.indexOf(profile)}
              />
            ))}
          </View>
          <View style={styles.column}>
            {rightColumn.map((profile, index) => (
              <ExploreCard
                key={index}
                profile={profile}
                height={index % 2 === 0 ? 320 : 260}
                index={dummyProfiles.indexOf(profile)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 120,
  },
  masonryContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensure columns are spaced apart
    gap: spacing.md,
  },
  column: {
    flex: 1, // Allow columns to take equal width
    width: COLUMN_WIDTH, // Explicit width optional but good for calculation reference
    gap: spacing.md,
  },
  card: {
    borderRadius: 20, // Softer corners
    overflow: "hidden",
    backgroundColor: colors.disabled,
    position: "relative",
    width: "100%",
    // Enhanced Shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  matchBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  matchText: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
  },
  glassInfo: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    borderRadius: 16,
    overflow: "hidden",
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardName: {
    fontSize: 14,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardLocation: {
    fontSize: 10,
    fontFamily: fontFamilies.primary.medium,
    color: "rgba(255, 255, 255, 0.8)",
  },
});
