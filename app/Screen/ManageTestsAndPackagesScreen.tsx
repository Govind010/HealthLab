import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";

const CARD_BG = "#FFFFFF";
const SCREEN_BG = "#F5FAFA";
const PRIMARY_TEAL = "#3ACDB9";
const PRIMARY_ORANGE = "#FF7A3C";
const TEXT_DARK = "#1A1A1A";

type TestItem = {
  id: string;
  name: string;
  price: string; // keep as string for input
};

type PackageItem = {
  id: string;
  name: string;
  price: string;
  testsIncluded: number;
};

export default function ManageTestsAndPackagesScreen() {
  const [activeTab, setActiveTab] = useState<"tests" | "packages">("tests");

  const [tests, setTests] = useState<TestItem[]>([
    { id: "T1", name: "CBC (Complete Blood Count)", price: "400" },
    { id: "T2", name: "Fasting Blood Sugar", price: "250" },
  ]);

  const [packages, setPackages] = useState<PackageItem[]>([
    {
      id: "P1",
      name: "Basic Health Package",
      price: "1500",
      testsIncluded: 8,
    },
    {
      id: "P2",
      name: "Full Body Checkup",
      price: "3000",
      testsIncluded: 20,
    },
  ]);

  const handleAddTest = () => {
    setTests((prev) => [
      ...prev,
      { id: `T${prev.length + 1}`, name: "New Test", price: "0" },
    ]);
  };

  const handleAddPackage = () => {
    setPackages((prev) => [
      ...prev,
      {
        id: `P${prev.length + 1}`,
        name: "New Package",
        price: "0",
        testsIncluded: 0,
      },
    ]);
  };

  const updateTestField = (
    id: string,
    field: keyof TestItem,
    value: string
  ) => {
    setTests((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const updatePackageField = (
    id: string,
    field: keyof PackageItem,
    value: string
  ) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const removeTest = (id: string) => {
    setTests((prev) => prev.filter((t) => t.id !== id));
  };

  const removePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

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
            style={[
              styles.tabButton,
              isTestsTab && styles.tabButtonActive,
            ]}
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
            style={[
              styles.tabButton,
              !isTestsTab && styles.tabButtonActive,
            ]}
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

        {/* Content */}
        {isTestsTab ? (
          <>
            {tests.map((test) => (
              <View key={test.id} style={styles.itemCard}>
                <View style={styles.itemHeaderRow}>
                  <TextInput
                    value={test.name}
                    onChangeText={(text) =>
                      updateTestField(test.id, "name", text)
                    }
                    style={styles.itemNameInput}
                  />
                  <TouchableOpacity
                    onPress={() => removeTest(test.id)}
                    style={styles.deleteBadge}
                  >
                    <Text style={styles.deleteBadgeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inlineRow}>
                  <Text style={styles.inlineLabel}>Price (₹)</Text>
                  <TextInput
                    value={test.price}
                    onChangeText={(text) =>
                      updateTestField(test.id, "price", text)
                    }
                    keyboardType="numeric"
                    style={styles.inlineInput}
                  />
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.9}
              onPress={handleAddTest}
            >
              <Text style={styles.addButtonText}>+ Add New Test</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {packages.map((pkg) => (
              <View key={pkg.id} style={styles.itemCard}>
                <View style={styles.itemHeaderRow}>
                  <TextInput
                    value={pkg.name}
                    onChangeText={(text) =>
                      updatePackageField(pkg.id, "name", text)
                    }
                    style={styles.itemNameInput}
                  />
                  <TouchableOpacity
                    onPress={() => removePackage(pkg.id)}
                    style={styles.deleteBadge}
                  >
                    <Text style={styles.deleteBadgeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inlineRow}>
                  <Text style={styles.inlineLabel}>Price (₹)</Text>
                  <TextInput
                    value={pkg.price}
                    onChangeText={(text) =>
                      updatePackageField(pkg.id, "price", text)
                    }
                    keyboardType="numeric"
                    style={styles.inlineInput}
                  />
                </View>

                <View style={styles.inlineRow}>
                  <Text style={styles.inlineLabel}>Tests Included</Text>
                  <TextInput
                    value={String(pkg.testsIncluded)}
                    onChangeText={(text) =>
                      updatePackageField(
                        pkg.id,
                        "testsIncluded",
                        text.replace(/[^0-9]/g, "")
                      )
                    }
                    keyboardType="numeric"
                    style={styles.inlineInput}
                  />
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.9}
              onPress={handleAddPackage}
            >
              <Text style={styles.addButtonText}>+ Add New Package</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Save changes */}
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.9}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  backButtonIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
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
  itemCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemNameInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: TEXT_DARK,
    paddingVertical: 4,
  },
  deleteBadge: {
    marginLeft: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE6E2",
  },
  deleteBadgeText: {
    fontSize: 14,
    color: PRIMARY_ORANGE,
    fontWeight: "700",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  inlineLabel: {
    width: 110,
    fontSize: 13,
    color: "#666",
  },
  inlineInput: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
  },
  addButton: {
    marginTop: 4,
    marginBottom: 16,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: PRIMARY_TEAL,
    borderStyle: "dashed",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: PRIMARY_TEAL,
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
