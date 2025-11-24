import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminScreen() {
  const totalAppointments = 0;
  const availableTests = 30;
  const healthPackages = 6;
  const patientsToday = 0;

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

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonIcon}>⌂</Text>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>

        {/* Page title */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Dashboard</Text>
          <Text style={styles.pageSubtitle}>
            Manage appointments, tests, and packages
          </Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconCircle}>
              <Text style={styles.statIcon}>📅</Text>
            </View>
            <Text style={styles.statValue}>{totalAppointments}</Text>
            <Text style={styles.statLabel}>Total Appointments</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, styles.testIconCircle]}>
              <Text style={styles.statIcon}>🧪</Text>
            </View>
            <Text style={styles.statValue}>{availableTests}</Text>
            <Text style={styles.statLabel}>Available Tests</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, styles.packageIconCircle]}>
              <Text style={styles.statIcon}>📦</Text>
            </View>
            <Text style={styles.statValue}>{healthPackages}</Text>
            <Text style={styles.statLabel}>Health Packages</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, styles.patientIconCircle]}>
              <Text style={styles.statIcon}>👥</Text>
            </View>
            <Text style={styles.statValue}>{patientsToday}</Text>
            <Text style={styles.statLabel}>Patients Today</Text>
          </View>
        </View>

        {/* Sections */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Appointments</Text>
          <Text style={styles.sectionDesc}>
            View and manage patient appointments
          </Text>
          <TouchableOpacity
            style={styles.sectionButton}
            activeOpacity={0.9}
            onPress={() => router.push("/Screen/AdminScreen/ManageAppointmentsScreen")}
          >
            <Text style={styles.sectionButtonText}>Manage Appointments</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Tests & Packages</Text>
          <Text style={styles.sectionDesc}>
            Update test prices and package details
          </Text>
          <TouchableOpacity
            style={styles.sectionButton}
            activeOpacity={0.9}
            onPress={() => router.push("/Screen/AdminScreen/ManageTestsAndPackagesScreen")}
          >
            <Text style={styles.sectionButtonText}>Manage Tests</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Time Slots</Text>
          <Text style={styles.sectionDesc}>
            Configure available appointment slots
          </Text>
          <TouchableOpacity
            style={styles.sectionButton}
            activeOpacity={0.9}
            onPress={() => router.push("/Screen/AdminScreen/ManageTimeSlotsScreen")}
          >
            <Text style={styles.sectionButtonText}>Manage Slots</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_BG = "#FFFFFF";
const SCREEN_BG = "#F5FAFA";
const PRIMARY_TEAL = "#3ACDB9";
const PRIMARY_ORANGE = "#FF7A3C";
const TEXT_DARK = "#1A1A1A";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
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
    fontSize: 14,
    marginRight: 6,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  pageHeader: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: TEXT_DARK,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#E5F7F4",
  },
  testIconCircle: {
    backgroundColor: "#E9F9FF",
  },
  packageIconCircle: {
    backgroundColor: "#E7F4FF",
  },
  patientIconCircle: {
    backgroundColor: "#FFF2E9",
  },
  statIcon: {
    fontSize: 18,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: TEXT_DARK,
  },
  statLabel: {
    fontSize: 13,
    color: "#6F6F6F",
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 14,
    color: "#6F6F6F",
    marginBottom: 14,
  },
  sectionButton: {
    backgroundColor: PRIMARY_TEAL,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  sectionButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
