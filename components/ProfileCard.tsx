import InterestChip from "@/components/ui/InterestChip";
import {
  borderRadius,
  colors,
  fontFamilies,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export interface ProfileData {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  jobTitle?: string;
  company?: string;
  interests: string[];
  images: string[];
}

interface ProfileCardProps {
  profile: ProfileData;
  showActions?: boolean;
}

const ProfileCard = ({ profile, showActions = false }: ProfileCardProps) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Primary Image */}
      <View style={styles.imageContainer}>
        {profile.images[0] ? (
          <Image
            source={{ uri: profile.images[0] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.mainImage, styles.placeholderImage]} />
        )}

        <View style={styles.nameOverlay}>
          <Text style={styles.nameText}>
            {profile.name}, {profile.age}
          </Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color={colors.white} />
            <Text style={styles.locationText}>{profile.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        {/* Basic Info (Job/School) */}
        {(profile.jobTitle || profile.company) && (
          <View style={styles.infoRow}>
            <Ionicons
              name="briefcase-outline"
              size={20}
              color={colors.textSecondary}
            />
            <Text style={styles.infoText}>
              {[profile.jobTitle, profile.company].filter(Boolean).join(" @ ")}
            </Text>
          </View>
        )}

        {/* Bio */}
        {profile.bio && (
          <View style={styles.bioContainer}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </View>
        )}

        {/* Interests */}
        {profile.interests && profile.interests.length > 0 && (
          <View style={styles.interestsContainer}>
            <Text style={styles.sectionTitle}>My Interests</Text>
            <View style={styles.chipsRow}>
              {profile.interests.map((interest, index) => (
                <InterestChip
                  key={index}
                  label={interest}
                  // We can pass onPress if we want interaction, but valid for preview
                />
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Secondary Images */}
      {profile.images.slice(1).map((img, index) => (
        <View key={index} style={styles.secondaryImageWrapper}>
          <Image
            source={{ uri: img }}
            style={styles.secondaryImage}
            resizeMode="cover"
          />
        </View>
      ))}

      {/* Bottom Padding for Scroll */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  imageContainer: {
    width: width,
    height: width * 1.2, // 4:5 aspect ratio essentially
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.textSecondary,
  },
  placeholderImage: {
    backgroundColor: "#ccc",
  },
  nameOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: "rgba(0,0,0,0.3)", // slight gradient or dim for readability
  },
  nameText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes["2xl"],
    color: colors.white,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  locationText: {
    fontSize: fontSizes.base,
    color: colors.white,
    fontWeight: "600",
  },
  sectionContainer: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  infoText: {
    fontSize: fontSizes.base,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  bioContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.lg,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  bioText: {
    fontSize: fontSizes.base,
    color: "#4A4A4A", // darker than textSecondary for readability
    lineHeight: 24,
  },
  interestsContainer: {
    marginBottom: spacing.lg,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  secondaryImageWrapper: {
    width: width - spacing.lg * 2,
    height: width, // Square or customize aspect ratio
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.md,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryImage: {
    width: "100%",
    height: "100%",
  },
});
