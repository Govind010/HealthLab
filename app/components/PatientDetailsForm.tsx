import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type Gender = "Male" | "Female" | "Other" | "";

interface PatientDetailsFormProps {
  fullName: string;
  age: string;
  gender: Gender;
  mobile: string;
  address: string;
  email: string;
  onChangeFullName: (value: string) => void;
  onChangeAge: (value: string) => void;
  onChangeGender: (value: Gender) => void;
  onChangeMobile: (value: string) => void;
  onChangeAddress: (value: string) => void;
  onChangeEmail: (value: string) => void;
}

const PatientDetailsForm: React.FC<PatientDetailsFormProps> = ({
  fullName,
  age,
  gender,
  mobile,
  address,
  email,
  onChangeFullName,
  onChangeAge,
  onChangeGender,
  onChangeMobile,
  onChangeAddress,
  onChangeEmail,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Patient Details</Text>

      <Text style={styles.label}>Full Name *</Text>
      <TextInput
        value={fullName}
        onChangeText={onChangeFullName}
        style={styles.input}
        placeholder="Enter full name"
      />

      <View style={styles.row}>
        <View style={[styles.rowItem, { marginRight: 8 }]}>
          <Text style={styles.label}>Age *</Text>
          <TextInput
            value={age}
            onChangeText={onChangeAge}
            keyboardType="numeric"
            style={styles.input}
            placeholder="Enter age"
          />
        </View>

        <View style={[styles.rowItem, { marginLeft: 8 }]}>
          <Text style={styles.label}>Mobile Number *</Text>
          <TextInput
            value={mobile}
            onChangeText={onChangeMobile}
            keyboardType="phone-pad"
            style={styles.input}
            placeholder="10-digit mobile number"
            maxLength={10}
          />
        </View>
      </View>

      <Text style={styles.label}>Gender *</Text>
      <View style={styles.genderRow}>
        {(["Male", "Female", "Other"] as Gender[]).map((g) => {
          const selected = gender === g;
          return (
            <TouchableOpacity
              key={g}
              style={[styles.genderChip, selected && styles.genderChipSelected]}
              onPress={() => onChangeGender(g)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.radioCircle,
                  selected && styles.radioCircleSelected,
                ]}
              />
              <Text
                style={[
                  styles.genderText,
                  selected && styles.genderTextSelected,
                ]}
              >
                {g}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Address *</Text>
      <TextInput
        value={address}
        onChangeText={onChangeAddress}
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter complete address"
        multiline
      />

      <Text style={styles.label}>Email (Optional)</Text>
      <TextInput
        value={email}
        onChangeText={onChangeEmail}
        style={styles.input}
        placeholder="Enter email address"
        keyboardType="email-address"
      />
    </View>
  );
};

export default PatientDetailsForm;

const styles = StyleSheet.create({
  card: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1A1A1A",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  rowItem: {
    flex: 1,
  },
  genderRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  genderChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D0E6E0",
    marginRight: 8,
  },
  genderChipSelected: {
    backgroundColor: "#E6FBF3",
    borderColor: "#00A57A",
  },
  radioCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.4,
    borderColor: "#9BC8BB",
    marginRight: 6,
  },
  radioCircleSelected: {
    borderColor: "#00A57A",
    backgroundColor: "#00A57A",
  },
  genderText: {
    fontSize: 13,
    color: "#555",
  },
  genderTextSelected: {
    color: "#007858",
    fontWeight: "600",
  },
});
