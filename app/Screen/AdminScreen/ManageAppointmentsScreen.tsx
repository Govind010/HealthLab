import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CARD_BG = "#FFFFFF";
const SCREEN_BG = "#F5FAFA";
const PRIMARY_TEAL = "#3ACDB9";
const PRIMARY_ORANGE = "#FF7A3C";
const TEXT_DARK = "#1A1A1A";

const MOCK_APPOINTMENTS = [
  {
    id: "APT-001",
    name: "Sham Sharma",
    test: "Full Body Checkup",
    date: "26 Nov 2025",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    id: "APT-002",
    name: "Ashish Chanchlani",
    test: "Blood Test",
    date: "26 Nov 2025",
    time: "11:15 AM",
    status: "Pending",
  },
  {
    id: "APT-003",
    name: "Amit Patel",
    test: "Thyroid Profile",
    date: "26 Nov 2025",
    time: "01:00 PM",
    status: "Completed",
  },
];

export default function ManageAppointmentsScreen() {
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
          <Text style={styles.pageTitle}>Appointments</Text>
          <Text style={styles.pageSubtitle}>
            View and manage patient appointments
          </Text>
        </View>

        {/* Filters */}
        <View style={styles.filterRow}>
          <TextInput
            placeholder="Search by patient or test"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* Appointments list */}
        {MOCK_APPOINTMENTS.map((apt) => (
          <View key={apt.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Text style={styles.appointmentName}>{apt.name}</Text>
              <Text
                style={[
                  styles.statusBadge,
                  apt.status === "Confirmed" && styles.statusConfirmed,
                  apt.status === "Pending" && styles.statusPending,
                  apt.status === "Completed" && styles.statusCompleted,
                ]}
              >
                {apt.status}
              </Text>
            </View>

            <Text style={styles.appointmentTest}>{apt.test}</Text>

            <View style={styles.appointmentMetaRow}>
              <Text style={styles.appointmentMeta}>📅 {apt.date}</Text>
              <Text style={styles.appointmentMeta}>⏰ {apt.time}</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.rescheduleButton]}
                activeOpacity={0.9}
              >
                <Text style={styles.actionButtonText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                activeOpacity={0.9}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

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
  filterRow: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: CARD_BG,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  appointmentCard: {
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
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  appointmentName: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_DARK,
  },
  statusBadge: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    color: "#333",
    backgroundColor: "#EEE",
  },
  statusConfirmed: {
    backgroundColor: "#E5F7F4",
    color: "#0C8F7B",
  },
  statusPending: {
    backgroundColor: "#FFF4D9",
    color: "#B07200",
  },
  statusCompleted: {
    backgroundColor: "#E6F4FF",
    color: "#1664C0",
  },
  appointmentTest: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  appointmentMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  appointmentMeta: {
    fontSize: 13,
    color: "#777",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginLeft: 8,
  },
  rescheduleButton: {
    backgroundColor: PRIMARY_TEAL,
  },
  cancelButton: {
    backgroundColor: "#FFE6E2",
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFF",
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: PRIMARY_ORANGE,
  },
});
