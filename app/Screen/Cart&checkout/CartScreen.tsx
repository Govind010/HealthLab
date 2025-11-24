import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import {
  cartData,
  CartItem,
  clearCart,
  removeTestFromCart,
  subscribeToCart,
} from "@/Data/cartData";

const { width } = Dimensions.get("window");
const CARD_SPACING = 12;
const CARD_WIDTH = width * 0.9;

const HOME_COLLECTION_CHARGE = 125;
const FREE_HOME_COLLECTION_THRESHOLD = 500;

function priceToNumber(price: string): number {
  const numeric = price.replace(/[^\d]/g, "");
  return Number(numeric) || 0;
}

export default function CartScreen() {
  const [cartTests, setCartTests] = useState<CartItem[]>([...cartData]);

  // Subscribe to real-time cart updates
  useEffect(() => {
    const unsubscribe = subscribeToCart(() => {
      setCartTests([...cartData]);
    });

    return unsubscribe;
  }, []);

  const subtotal = cartTests.reduce(
    (sum, test) => sum + priceToNumber(test.price),
    0
  );
  const hasFreeHomeCollection = subtotal >= FREE_HOME_COLLECTION_THRESHOLD;
  const homeCollectionCharge = hasFreeHomeCollection
    ? 0
    : HOME_COLLECTION_CHARGE;
  const totalAmount = subtotal + homeCollectionCharge;
  const remainingForFree = hasFreeHomeCollection
    ? 0
    : Math.max(0, FREE_HOME_COLLECTION_THRESHOLD - subtotal);

  const handleRemove = (name: string) => {
    removeTestFromCart(name);
  };

  const handleClear = () => {
    clearCart();
  };

  const renderTestCard = ({ item: test }: { item: CartItem }) => (
    <View key={test.name} style={styles.testCard}>
      <View style={styles.testInfo}>
        <Text style={styles.testName}>{test.name}</Text>
        <Text style={styles.testDesc}>{test.desc}</Text>
        <View>
          <Text style={styles.CatText}>{test.category}</Text>
        </View>
      </View>

      <View style={styles.testPrice}>
        <Text style={styles.price}>{test.price}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.7}
          onPress={() => handleRemove(test.name)}
        >
          <Ionicons name="trash-outline" size={24} color="#c91010ff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Text style={styles.header}>Shopping Cart</Text>

        <FlatList
          data={cartTests}
          renderItem={renderTestCard}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          }
          contentContainerStyle={styles.listContent}
        />

        {cartTests.length > 0 && (
          <>
            <OrderSummaryCard
              subtotal={subtotal}
              homeCollectionCharge={homeCollectionCharge}
              totalAmount={totalAmount}
              remainingForFree={remainingForFree}
              hasFreeHomeCollection={hasFreeHomeCollection}
              handleClear={handleClear}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "#F5FAFA",
    paddingHorizontal: 16,
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
  CatText: {
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteIcon: {
    fontSize: 14,
  },
});