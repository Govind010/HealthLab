import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = { Value: string; onChangeText: (text: string) => void };

export default function SearchBar({ Value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#999"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for...e.g. Thyroid"
        placeholderTextColor="#999"
        value={Value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: "#666",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#fff",
    paddingVertical: 0,
  },
});
