import ProfileCard, { ProfileData } from "@/components/ProfileCard";
import { colors, spacing } from "@/constants/globalStyles";
import { useOnboarding } from "@/context/OnboardingContext";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

// Mock Data generator
const generateMockProfiles = (lookingFor: string): ProfileData[] => {
  return [
    {
      id: "1",
      name: "Sarah",
      age: 24,
      images: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
      ],
      bio: "Adventure seeker and coffee lover. Always looking for the next hiking trail.",
      location: "New York, NY",
      jobTitle: "Designer",
      company: "Creative Studio",
      interests: ["Travel", "Photography", "Coffee"],
    },
    {
      id: "2",
      name: "Jessica",
      age: 26,
      images: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop",
      ],
      bio: "Artist by day, gamer by night. Let's play some CoD.",
      location: "Brooklyn, NY",
      interests: ["Art", "Gaming", "Music"],
    },
    {
      id: "3",
      name: "Emily",
      age: 23,
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
      ],
      bio: "Love to travel and meet new people. Fluent in sarcasm.",
      location: "Jersey City, NJ",
      school: "NYU",
      interests: ["Reading", "Travel"],
    },
  ];
};

export default function HomeScreen() {
  const { data } = useOnboarding();
  const profiles = generateMockProfiles(data.lookingFor);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ProfileCard profile={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
    // alignItems: "center", // ProfileCard takes full width roughly
    gap: spacing.lg,
  },
  cardContainer: {
    marginBottom: spacing.md,
    alignItems: "center",
  },
});
