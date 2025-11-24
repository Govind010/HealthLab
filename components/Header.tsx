import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  const router = useRouter();

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
  buttonStyle: { paddingVertical: 14, paddingHorizontal: 16 },
});
