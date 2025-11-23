import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TestEditForm() {
  return (
    <View style={styles.itemCard}>
      <Text style={styles.sectionTitle}>Test Edit Form</Text>
      <Text style={styles.helperText}>
        Select an existing test to edit, or leave it empty to create a new test.
      </Text>

      {/* Dropdown menu */}
      <Text style={styles.fieldLabel}>Select Test (optional)</Text>
      <TextInput
        placeholder="Search or select a test"
        style={styles.textInput}
      />

      {/* Test name */}
      <Text style={styles.fieldLabel}>Enter Test Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g. Vitamin D 25-Hydroxy"
      />

      {/* Description */}
      <Text style={styles.fieldLabel}>Enter Description</Text>
      <TextInput
        style={[styles.textInput, styles.multilineInput]}
        placeholder="Short description of the test"
      />

      {/* Price */}
      <Text style={styles.fieldLabel}>Price (₹)</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g. 500"
        keyboardType="numeric"
      />
    </View>
  );
}

const CARD_BG = "#FFFFFF";
const SCREEN_BG = "#F5FAFA";
const PRIMARY_TEAL = "#3ACDB9";
const PRIMARY_ORANGE = "#FF7A3C";
const TEXT_DARK = "#1A1A1A";
const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 4,
  },
  helperText: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginTop: 8,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
  },
  multilineInput: {
    minHeight: 70,
    textAlignVertical: "top",
  },
});
