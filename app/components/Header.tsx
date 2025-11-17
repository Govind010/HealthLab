import { StyleSheet } from "react-native";
import { Text, View,TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Header(){
    return<View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>HealthLab</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
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
});
