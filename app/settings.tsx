import { EditorialHeader } from "@/components/ui/EditorialComponents";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [discoveryEnabled, setDiscoveryEnabled] = useState(true);

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  const MenuItem = ({
    label,
    icon,
    value,
    onPress,
    isDestructive = false,
  }: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    value?: string | React.ReactNode;
    onPress?: () => void;
    isDestructive?: boolean;
  }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View
          style={[
            styles.iconContainer,
            isDestructive && styles.destructiveIcon,
          ]}
        >
          <Ionicons
            name={icon}
            size={20}
            color={isDestructive ? colors.white : colors.secondary}
          />
        </View>
        <Text
          style={[
            styles.menuItemLabel,
            isDestructive && styles.destructiveText,
          ]}
        >
          {label}
        </Text>
      </View>
      <View style={styles.menuItemRight}>
        {value && typeof value === "string" ? (
          <Text style={styles.menuItemValue}>{value}</Text>
        ) : (
          value
        )}
        {onPress && (
          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.textSecondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.secondary} />
        </TouchableOpacity>
        <EditorialHeader title="SETTINGS" subtitle="Preferences & Account" />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Section title="ACCOUNT">
          <MenuItem
            label="Phone Number"
            icon="call-outline"
            value="+1 (555) 123-4567"
            onPress={() => {}}
          />
          <MenuItem
            label="Email"
            icon="mail-outline"
            value="user@example.com"
            onPress={() => {}}
          />
          <MenuItem
            label="Notifications"
            icon="notifications-outline"
            value={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            }
          />
        </Section>

        <Section title="DISCOVERY">
          <MenuItem
            label="Show me on Destined"
            icon="eye-outline"
            value={
              <Switch
                value={discoveryEnabled}
                onValueChange={setDiscoveryEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            }
          />
          <MenuItem
            label="Age Range"
            icon="calendar-outline"
            value="18 - 35"
            onPress={() => {}}
          />
          <MenuItem
            label="Distance"
            icon="location-outline"
            value="Up to 50 miles"
            onPress={() => {}}
          />
        </Section>

        <Section title="LEGAL">
          <MenuItem
            label="Privacy Policy"
            icon="shield-checkmark-outline"
            onPress={() => {}}
          />
          <MenuItem
            label="Terms of Service"
            icon="document-text-outline"
            onPress={() => {}}
          />
          <MenuItem label="Licenses" icon="ribbon-outline" onPress={() => {}} />
        </Section>

        <Section title="ACTIONS">
          <MenuItem label="Log Out" icon="log-out-outline" onPress={() => {}} />
          <MenuItem
            label="Delete Account"
            icon="trash-outline"
            isDestructive
            onPress={() => {}}
          />
        </Section>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
    marginTop: -15, // Align with header text
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  sectionContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  destructiveIcon: {
    backgroundColor: "#FF4444",
  },
  menuItemLabel: {
    fontSize: 16,
    fontFamily: fontFamilies.primary.medium,
    color: colors.secondary,
  },
  destructiveText: {
    color: "#FF4444",
  },
  menuItemValue: {
    fontSize: 14,
    fontFamily: fontFamilies.primary.regular,
    color: colors.textSecondary,
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: fontFamilies.primary.regular,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
