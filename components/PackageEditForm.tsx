import { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";
import CustomSelect from "./CustomSelect";

export default function PackageEditForm() {
  const [selectedTest, setSelectedTest] = useState<string>();
  const [popular, setPopular] = useState<boolean>(true);

  // Sample test data
  const existingPackages = [
    { name: "Basic Health Checkup", id: "1" },
    { name: "Diabetes Care Package", id: "2" },
    { name: "Heart Health Package", id: "3" },
    { name: "Women's Wellness Package", id: "4" },
    { name: "Men's Health Package", id: "5" },
    { name: "Fever Panel", id: "6" },
  ];

  // Sample test data
  const existingTests = [
    { name: "Vitamin D 25-Hydroxy", id: "vitamin_d" },
    { name: "Complete Blood Count (CBC)", id: "cbc" },
    { name: "Thyroid Profile", id: "thyroid" },
    { name: "Lipid Profile", id: "lipid" },
    { name: "Blood Glucose Fasting", id: "glucose" },
    { name: "Liver Function Test", id: "lft" },
    { name: "HbA1c Test", id: "hba1c" },
    { name: "Iron Studies", id: "iron" },
  ];

  return (
    <View style={styles.itemCard}>
      <Text style={styles.sectionTitle}>Package Edit Form</Text>
      <Text style={styles.helperText}>
        Select an existing package to edit, or leave it empty to create a new
        package.
      </Text>
      <Text style={styles.fieldLabel}>Select Package (optional)</Text>
      <CustomSelect
        value={selectedTest}
        onValueChange={setSelectedTest}
        placeholder="Search or select a test"
        options={existingPackages}
      />

      {/* Package name */}
      <Text style={styles.fieldLabel}>Package Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g. Premium Health Package"
      />

      {/* Description */}
      <Text style={styles.fieldLabel}>Enter Description</Text>
      <TextInput
        style={[styles.textInput, styles.multilineInput]}
        placeholder="e.g. Ideal for annual health check"
      />

      {/* Prices */}
      <View style={styles.inlineRow}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.fieldLabel}>New Price (₹)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. 2500"
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={styles.fieldLabel}>Original Price (₹)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. 4000"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Popular toggle */}
      <View style={styles.inlineRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.fieldLabel}>Popular</Text>
          <Text style={styles.helperText}>
            Mark this package as popular to highlight it.
          </Text>
        </View>
        <Switch value={popular} onValueChange={setPopular} />
      </View>

      {/* Tests dropdown / multi-select */}
      <Text style={styles.fieldLabel}>Tests Included in Package</Text>
      <Text style={styles.helperText}>
        Select one or more tests to be part of this package.
      </Text>
      <CustomSelect
        value={selectedTest}
        onValueChange={setSelectedTest}
        placeholder="Search or select a test"
        options={existingTests}
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
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
