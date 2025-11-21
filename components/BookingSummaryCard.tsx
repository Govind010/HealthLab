import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartItem } from "../Data/cartData";

interface BookingSummaryCardProps {
  cartTests: CartItem[];
  subtotal: number;
  visitingCharge: number;
  totalAmount: number;
  onConfirmBooking: () => void;
}

const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
  cartTests,
  subtotal,
  visitingCharge,
  totalAmount,
  onConfirmBooking,
}) => {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Booking Summary</Text>

      {cartTests.map((test) => (
        <View key={test.name} style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{test.name}</Text>
          <Text style={styles.summaryValue}>{test.price}</Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>₹{subtotal}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Visiting Charges</Text>
        <Text style={styles.summaryValue}>
          {visitingCharge === 0 ? "₹0" : `₹${visitingCharge}`}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>₹{totalAmount}</Text>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        activeOpacity={0.9}
        onPress={onConfirmBooking}
      >
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>

      <Text style={styles.footerNote}>
        Our phlebotomist will arrive at your chosen time slot.
      </Text>
    </View>
  );
};

export default BookingSummaryCard;

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1A1A1A",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
    flex: 1,
    paddingRight: 16,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#00A57A",
  },
  confirmButton: {
    marginTop: 16,
    backgroundColor: "#FF7A3C",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  footerNote: {
    marginTop: 8,
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
});
