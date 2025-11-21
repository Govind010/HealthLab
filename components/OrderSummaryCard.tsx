import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type OrderSummaryCardProps = {
  subtotal: number;
  homeCollectionCharge: number;
  totalAmount: number;
  remainingForFree: number;
  hasFreeHomeCollection: boolean;
  handleClear: () => void;
};

export default function OrderSummaryCard({
  subtotal,
  homeCollectionCharge,
  totalAmount,
  remainingForFree,
  hasFreeHomeCollection,
  handleClear,
}: OrderSummaryCardProps) {
  return (
    <>
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClear}
        activeOpacity={0.8}
      >
        <Text style={styles.clearButtonText}>Clear Cart</Text>
      </TouchableOpacity>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{subtotal}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Home Collection & Consumables</Text>
          <Text style={styles.summaryValue}>
            {homeCollectionCharge === 0 ? "Free" : `₹${homeCollectionCharge}`}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{totalAmount}</Text>
        </View>

        <View style={styles.freeBanner}>
          <Text style={styles.freeBannerText}>
            {hasFreeHomeCollection
              ? "You have unlocked free home collection!"
              : `Add tests worth ₹${remainingForFree} more for free home collection`}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={0.85}
          onPress={() => router.push("/Screen/BookAppointmentScreen")}
        >
          <Text style={styles.bookButtonText}>Proceed to Book</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Reports will be available within 24–48 hours.
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  summaryCard: {
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
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#00A57A",
  },
  freeBanner: {
    marginTop: 10,
    backgroundColor: "#F3FFF9",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  freeBannerText: {
    fontSize: 13,
    color: "#00A57A",
  },
  bookButton: {
    marginTop: 14,
    backgroundColor: "#FF7A3C",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  bookButtonText: {
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
