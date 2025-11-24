import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { cartData, subscribeToCart } from "@/Data/cartData";

export default function Header() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(cartData.length);

  // Subscribe to cart changes for real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToCart(() => {
      setCartCount(cartData.length);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.buttonStyle}>
        <Ionicons name="menu" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>HealthLab</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => router.push("/Screen/Cart&checkout/CartScreen")}
      >
        <Ionicons name="cart-outline" size={24} color="#333" />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {cartCount > 99 ? "99+" : cartCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    borderBottomWidth: 0.4,
    borderBottomColor: "#EAEAEA",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1CC9B0",
    letterSpacing: 0.5,
  },
  buttonStyle: { 
    paddingVertical: 14, 
    paddingHorizontal: 16,
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});