import { useState } from "react";
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
const TEXT_DARK = "#1A1A1A";

type TimeSlot = {
  id: string;
  label: string; // e.g. "09:00 AM - 10:00 AM"
};

export default function ManageTimeSlotsScreen() {
  const [slots, setSlots] = useState<TimeSlot[]>([
    { id: "S1", label: "09:00 AM - 10:00 AM" },
    { id: "S2", label: "10:00 AM - 11:00 AM" },
    { id: "S3", label: "11:00 AM - 12:00 PM" },
  ]);

  const handleAddSlot = () => {
    const nextIndex = slots.length + 1;
    setSlots((prev) => [
      ...prev,
      { id: `S${nextIndex}`, label: "01:00 PM - 02:00 PM" }, // default text
    ]);
  };

  const updateSlot = (id: string, value: string) => {
    setSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, label: value } : slot))
    );
  };

  const removeSlot = (id: string) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

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
          <Text style={styles.pageTitle}>Time Slots</Text>
          <Text style={styles.pageSubtitle}>
            Manage available appointment time slots
          </Text>
        </View>

        {/* Slots list */}
        {slots.map((slot) => (
          <View key={slot.id} style={styles.itemCard}>
            <View style={styles.itemHeaderRow}>
              <TextInput
                value={slot.label}
                onChangeText={(text) => updateSlot(slot.id, text)}
                style={styles.itemNameInput}
                placeholder="Enter time range e.g. 09:00 AM - 10:00 AM"
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                onPress={() => removeSlot(slot.id)}
                style={styles.deleteBadge}
              >
                <Text style={styles.deleteBadgeText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add new slot */}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.9}
          onPress={handleAddSlot}
        >
          <Text style={styles.addButtonText}>+ Add Time Slot</Text>
        </TouchableOpacity>

        {/* Save */}
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.9}>
          <Text style={styles.saveButtonText}>Save Slots</Text>
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
  },
  itemNameInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
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
    color: "#FF7A3C",
    fontWeight: "700",
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
