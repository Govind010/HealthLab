// CartScreen.tsx
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { testCategories } from "../Data/data";
import {
  cartData,
  clearCart,
  removeTestFromCart,
  CartItem,
} from "../Data/cartData";

const { width } = Dimensions.get("window");
const CARD_SPACING = 12;
const CARD_WIDTH = width * 0.9;

const HOME_COLLECTION_CHARGE = 125;
const FREE_HOME_COLLECTION_THRESHOLD = 500; // tweak as you like

function priceToNumber(price: string): number {
  // "₹250" -> 250
  const numeric = price.replace(/[^\d]/g, "");
  return Number(numeric) || 0;
}

export default function CartScreen() {
  // local state just to force re-render when we mutate cartData
  const [, setVersion] = useState(0);

  const allTests = useMemo(
    () => testCategories.flatMap((cat) => cat.tests),
    []
  );

  const cartTests = useMemo(() => {
    return cartData
      .map((item: CartItem) =>
        allTests.find((test) => test.name === item.name)
      )
      .filter((t) => !!t);
  }, [allTests, cartData, setVersion]); // setVersion is stable but keeps TS happy

  const subtotal = cartTests.reduce(
    (sum: number, test: any) => sum + priceToNumber(test.price),
    0
  );
  const hasFreeHomeCollection = subtotal >= FREE_HOME_COLLECTION_THRESHOLD;
  const homeCollectionCharge = hasFreeHomeCollection ? 0 : HOME_COLLECTION_CHARGE;
  const totalAmount = subtotal + homeCollectionCharge;
  const remainingForFree =
    hasFreeHomeCollection ? 0 : Math.max(0, FREE_HOME_COLLECTION_THRESHOLD - subtotal);

  const handleRemove = (name: string) => {
    removeTestFromCart(name);
    setVersion((v) => v + 1);
  };

  const handleClear = () => {
    clearCart();
    setVersion((v) => v + 1);
  };

  const renderTestCard = ({ item: test }: any) => (
    <View key={test.name} style={styles.testCard}>
      <View style={styles.testInfo}>
        <Text style={styles.testName}>{test.name}</Text>
        <Text style={styles.testDesc}>{test.desc}</Text>
      </View>

      <View style={styles.testPrice}>
        <Text style={styles.price}>{test.price}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.7}
          onPress={() => handleRemove(test.name)}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>

      <FlatList
        data={cartTests}
        renderItem={renderTestCard}
        keyExtractor={(item: any) => item.name}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      {cartTests.length > 0 && (
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
              <Text style={styles.summaryLabel}>
                Home Collection & Consumables
              </Text>
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
              onPress={() => {
                // handle navigation / booking
              }}
            >
              <Text style={styles.bookButtonText}>Proceed to Book</Text>
            </TouchableOpacity>

            <Text style={styles.footerNote}>
              Reports will be available within 24–48 hours.
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 12,
  },
  emptyText: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
  testCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    width: CARD_WIDTH,
    alignSelf: "center",
    marginBottom: CARD_SPACING,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  testInfo: {
    flex: 1,
    marginRight: 12,
  },
  testName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  testDesc: {
    fontSize: 13,
    color: "#6F6F6F",
  },
  testPrice: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#FFF1F0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteIcon: {
    fontSize: 14,
  },
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
