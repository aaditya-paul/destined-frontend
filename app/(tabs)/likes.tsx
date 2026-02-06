import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { colors } from "@constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function LikesScreen() {
  // FREE VERSION - No blurry images!
  const freeLikes = [
    {
      id: 1,
      name: "Alex",
      age: 26,
      distance: "2 km away",
      bio: "Coffee lover • Travel addict",
      likedYouAt: "Today, 10:30 AM",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      isNew: true, // New like (you haven't seen yet)
    },
    {
      id: 2,
      name: "Sophia",
      age: 24,
      distance: "5 km away",
      bio: "Artist • Dog mom",
      likedYouAt: "Yesterday, 3:15 PM",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      isNew: false,
    },
    {
      id: 3,
      name: "Jordan",
      age: 28,
      distance: "1 km away",
      bio: "Gym enthusiast • Foodie",
      likedYouAt: "2 days ago",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      isNew: true,
    },
    {
      id: 4,
      name: "Mike",
      age: 30,
      distance: "3 km away",
      bio: "Musician • Photographer",
      likedYouAt: "3 days ago",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      isNew: false,
    },
  ];

  const handleLikeBack = (id: number) => {
    alert(`Liked back user ${id}! It's a MATCH!`);
    // Here you would call API to create a match
  };

  const handlePass = (id: number) => {
    alert(`Passed on user ${id}`);
    // Here you would call API to pass/reject
  };

  return (
    <View style={styles.container}>
      {/* HEADER - FREE VERSION BADGE */}
      <View style={styles.header}>
        <View style={styles.freeBadge}>
          <Ionicons name="lock-open" size={16} color="#4CAF50" />
          <Text style={styles.freeBadgeText}>FREE VERSION</Text>
        </View>
        <Text style={styles.headerTitle">Who Liked You</Text>
        <Text style={styles.headerSubtitle}>See all clearly - No blurry premium lock!</Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{freeLikes.length}</Text>
          <Text style={styles.statLabel}>Total Likes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{freeLikes.filter(l => l.isNew).length}</Text>
          <Text style={styles.statLabel}>New Likes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Matches</Text>
        </View>
      </View>

      {/* LIKES LIST - ALL CLEAR! */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {freeLikes.map((user) => (
          <View key={user.id} style={[styles.likeCard, user.isNew && styles.newLikeCard]}>
            
            {/* PROFILE IMAGE - NOT BLURRY! */}
            <Image source={{ uri: user.image }} style={styles.profileImage} />
            
            {/* NEW BADGE */}
            {user.isNew && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>
            )}

            {/* USER INFO */}
            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{user.name}, {user.age}</Text>
                <Ionicons name="location" size={14} color={colors.textSecondary} />
                <Text style={styles.distance}>{user.distance}</Text>
              </View>
              
              <Text style={styles.userBio}>{user.bio}</Text>
              
              <View style={styles.likedTimeRow}>
                <Ionicons name="time" size={14} color={colors.textTertiary} />
                <Text style={styles.likedTime}>Liked you: {user.likedYouAt}</Text>
              </View>
            </View>

            {/* ACTION BUTTONS */}
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.passButton}
                onPress={() => handlePass(user.id)}
              >
                <Ionicons name="close-circle" size={28} color="#FF6B6B" />
                <Text style={styles.passButtonText}>Pass</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.likeButton}
                onPress={() => handleLikeBack(user.id)}
              >
                <Ionicons name="heart-circle" size={28} color="#4CAF50" />
                <Text style={styles.likeButtonText}>Like Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* FREE FEATURE EXPLANATION */}
        <View style={styles.freeInfoCard}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Text style={styles.freeInfoTitle}>100% Free Forever</Text>
          <Text style={styles.freeInfoText}>
            Unlike other apps, we don't blur your likes. See everyone clearly and match for free!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: colors.primary + "15",
  },
  freeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50" + "20",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  freeBadgeText: {
    color: "#4CAF50",
    fontSize: 12,
    fontFamily: "Manrope-Bold",
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Manrope-Bold",
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
    fontFamily: "Manrope",
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 15,
    justifyContent: "space-between",
  },
  statBox: {
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: "Manrope-Bold",
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  likeCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  newLikeCard: {
    borderWidth: 2,
    borderColor: colors.primary + "50",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  newBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  newBadgeText: {
    color: "white",
    fontSize: 10,
    fontFamily: "Manrope-Bold",
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    color: colors.textPrimary,
    marginRight: 8,
  },
  distance: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  userBio: {
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 5,
    fontFamily: "Manrope",
  },
  likedTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  likedTime: {
    fontSize: 12,
    color: colors.textTertiary,
    marginLeft: 5,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  passButton: {
    alignItems: "center",
    marginRight: 15,
  },
  passButtonText: {
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 3,
  },
  likeButton: {
    alignItems: "center",
  },
  likeButtonText: {
    fontSize: 12,
    color: "#4CAF50",
    marginTop: 3,
    fontFamily: "Manrope-SemiBold",
  },
  freeInfoCard: {
    backgroundColor: colors.primary + "10",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  freeInfoTitle: {
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    color: colors.textPrimary,
    marginTop: 10,
  },
  freeInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
});