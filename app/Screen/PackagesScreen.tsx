import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { addTestToCart } from "@/Data/cartData";
import { healthPackages } from "@/Data/data";

export default function Packages() {
  const handleAddToCart = (pkg: any) => {
    // Re-using addTestToCart – feel free to create a dedicated addPackageToCart
    const result = addTestToCart({
      name: pkg.name,
      desc: pkg.desc,
      price: pkg.price,
      category: "Health Package",
    });

    if (!result.added) {
      Toast.show({
        type: "error",
        text1: "Already in cart",
        text2: `${pkg.name} is already added`,
        position: "bottom",
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Added to cart",
        text2: `${pkg.name} has been added`,
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  const renderPackageCard = ({ item: pkg }: any) => {
    const tests = pkg.tests || [];
    const visibleTests = tests.slice(0, 3);
    const remainingCount = tests.length - visibleTests.length;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.packageCard}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.packageName}>{pkg.name}</Text>
              {pkg.subtitle ? (
                <Text style={styles.packageSubtitle}>{pkg.subtitle}</Text>
              ) : null}
            </View>
            {pkg.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>Popular</Text>
              </View>
            )}
          </View>

          {/* Includes */}
          <View style={styles.includesSection}>
            <Text style={styles.includesTitle}>
              Includes {tests.length} {tests.length === 1 ? "test" : "tests"}
            </Text>
            {visibleTests.map((test: string) => (
              <View key={test} style={styles.testRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.testText}>{test}</Text>
              </View>
            ))}
            {remainingCount > 0 && (
              <Text style={styles.moreTestsText}>
                + {remainingCount} more test
                {remainingCount > 1 ? "s" : ""}
              </Text>
            )}
          </View>

          {/* Footer: price + CTA */}
          <View style={styles.footerRow}>
            <View>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{pkg.price}</Text>
                {pkg.originalPrice ? (
                  <Text style={styles.originalPrice}>{pkg.originalPrice}</Text>
                ) : null}
              </View>
              {pkg.savingsText ? (
                <Text style={styles.savingsText}>{pkg.savingsText}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.7}
              onPress={() => handleAddToCart(pkg)}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Text style={styles.header}>Health Packages</Text>
        <FlatList
          data={healthPackages}
          keyExtractor={(item: any) => item.id}
          renderItem={renderPackageCard}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "#F5FAFA",
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  cardContainer: {
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  packageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  packageName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  packageSubtitle: {
    fontSize: 13,
    color: "#6F6F6F",
  },
  popularBadge: {
    backgroundColor: "#FFE1CF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  popularBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#D7722C",
  },
  includesSection: {
    marginTop: 8,
    marginBottom: 14,
  },
  includesTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 6,
  },
  testRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  bullet: {
    fontSize: 10,
    marginRight: 6,
    marginTop: 2,
    color: "#6F6F6F",
  },
  testText: {
    flex: 1,
    fontSize: 13,
    color: "#6F6F6F",
  },
  moreTestsText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
    color: "#17A2B8",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: "#9A9A9A",
    textDecorationLine: "line-through",
  },
  savingsText: {
    marginTop: 2,
    fontSize: 12,
    color: "#28A745",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#3ACDB9",
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});
