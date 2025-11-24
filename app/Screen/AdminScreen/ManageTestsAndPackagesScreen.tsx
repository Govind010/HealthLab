import PackageEditForm from "@/components/PackageEditForm";
import TestEditForm from "@/components/TestEditform";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CARD_BG = "#FFFFFF";
const SCREEN_BG = "#F5FAFA";
const PRIMARY_TEAL = "#3ACDB9";
const TEXT_DARK = "#1A1A1A";

export default function ManageTestsAndPackagesScreen() {
  const [activeTab, setActiveTab] = useState<"tests" | "packages">("tests");
  const isTestsTab = activeTab === "tests";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.logoText}>
            <Text style={styles.logoAccent}>HealthLab</Text> Admin
          </Text>
        </View>

        {/* Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Tests & Packages</Text>
          <Text style={styles.pageSubtitle}>
            Update prices and manage test packages
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabButton, isTestsTab && styles.tabButtonActive]}
            onPress={() => setActiveTab("tests")}
          >
            <Text
              style={[
                styles.tabButtonText,
                isTestsTab && styles.tabButtonTextActive,
              ]}
            >
              Tests
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, !isTestsTab && styles.tabButtonActive]}
            onPress={() => setActiveTab("packages")}
          >
            <Text
              style={[
                styles.tabButtonText,
                !isTestsTab && styles.tabButtonTextActive,
              ]}
            >
              Packages
            </Text>
          </TouchableOpacity>
        </View>

        {/* CONTENT AREA */}
        {isTestsTab ? <TestEditForm /> : <PackageEditForm />}

        {/* Save changes */}
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.9}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_DARK,
  },
  logoAccent: {
    color: PRIMARY_TEAL,
  },
  pageHeader: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: TEXT_DARK,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#E4F3F2",
    borderRadius: 999,
    padding: 3,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: CARD_BG,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5C6C6B",
  },
  tabButtonTextActive: {
    color: TEXT_DARK,
  },
  saveButton: {
    backgroundColor: PRIMARY_TEAL,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFF",
  },
});
