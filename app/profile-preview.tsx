import { ProfileView } from "@/components/ProfileView";
import ComplimentModal from "@/components/ui/ComplimentModal";
import { LikeButton, PassButton } from "@/components/ui/like_unline_actionsBtn";
import { colors, generalSizes, spacing } from "@/constants/globalStyles";
import { useOnboarding } from "@/context/OnboardingContext";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const ProfilePreviewScreen = () => {
  const { data } = useOnboarding();
  const [showComplimentModal, setShowComplimentModal] = useState(false);

  const handleLike = () => {
    setShowComplimentModal(true);
  };

  const handleSendCompliment = (message: string) => {
    console.log(`Liked with message: ${message}`);
    // Handle the like action with message
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileView profile={data} />
      </ScrollView>

      {/* FIXED ACTION BAR */}
      <View style={styles.interactionBar}>
        <PassButton size={generalSizes["4xl"]} onPress={() => {}} />
        <LikeButton size={generalSizes["4xl"]} onPress={handleLike} />
      </View>

      {/* COMPLIMENT MODAL */}
      <ComplimentModal
        visible={showComplimentModal}
        onClose={() => setShowComplimentModal(false)}
        onSend={handleSendCompliment}
        profileName={data.firstName || "them"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 160 },

  // Action Bar
  interactionBar: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: spacing.xl,
  },
});

export default ProfilePreviewScreen;
