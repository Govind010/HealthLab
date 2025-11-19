import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TIME_SLOTS = [
  "7:00 AM - 9:00 AM",
  "9:00 AM - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "1:00 PM - 3:00 PM",
  "3:00 PM - 5:00 PM",
  "5:00 PM - 7:00 PM",
];

interface AppointmentScheduleCardProps {
  selectedDate: string;
  selectedSlot: string;
  onPressDatePicker: () => void;
  onSelectTimeSlot: (slot: string) => void;
}

const AppointmentScheduleCard: React.FC<AppointmentScheduleCardProps> = ({
  selectedDate,
  selectedSlot,
  onPressDatePicker,
  onSelectTimeSlot,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Appointment Schedule</Text>

      <Text style={styles.label}>Select Date *</Text>
      <TouchableOpacity
        style={styles.datePicker}
        onPress={onPressDatePicker}
        activeOpacity={0.8}
      >
        <Text style={selectedDate ? styles.dateText : styles.datePlaceholder}>
          {selectedDate || "Pick a date"}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.label, { marginTop: 16 }]}>
        Select Time Slot *
      </Text>
      <View style={styles.timeGrid}>
        {TIME_SLOTS.map((slot) => {
          const selected = selectedSlot === slot;
          return (
            <TouchableOpacity
              key={slot}
              style={[styles.timeSlot, selected && styles.timeSlotSelected]}
              onPress={() => onSelectTimeSlot(slot)}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.timeSlotText,
                  selected && styles.timeSlotTextSelected,
                ]}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default AppointmentScheduleCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1A1A1A",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
    marginTop: 4,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
  },
  datePlaceholder: {
    fontSize: 14,
    color: "#9B9B9B",
  },
  dateText: {
    fontSize: 14,
    color: "#1A1A1A",
  },
  timeGrid: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlot: {
    width: "48%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDE4ED",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  timeSlotSelected: {
    backgroundColor: "#E6FBF3",
    borderColor: "#00A57A",
  },
  timeSlotText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#304050",
  },
  timeSlotTextSelected: {
    color: "#007858",
    fontWeight: "700",
  },
});
