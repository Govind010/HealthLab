import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { testCategories } from "../data";

const { width } = Dimensions.get("window");
const CARD_SPACING = 12;
const CARD_WIDTH = width * 0.8;

export default function Tests() {
  const renderTestCard = ({ item: test }: any) => (
    <View key={test.name} style={styles.testCard}>
      <View style={styles.testInfo}>
        <Text style={styles.testName}>{test.name}</Text>
        <Text style={styles.testDesc}>{test.desc}</Text>
      </View>
      <View style={styles.testPrice}>
        <Text style={styles.price}>{test.price}</Text>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategory = ({ item }: any) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <FlatList
        data={item.tests}
        renderItem={renderTestCard}
        keyExtractor={(test) => test.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.testsListContent}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={CARD_WIDTH + CARD_SPACING}
      />
    </View>
  );

  return (
    <View>
      <FlatList
        data={testCategories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  testsListContent: {
    paddingBottom: 4,
    paddingLeft: 3,
  },
  testCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
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
  addButton: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
