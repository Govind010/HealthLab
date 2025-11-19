import React, { useState, useImperativeHandle } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type Gender = "Male" | "Female" | "Other" | "";

// This is what BookAppointmentScreen will use for ref
export interface PatientDetailsFormHandle {
  validate: () => boolean;
}

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

// Simple validators
const validateFullName = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "Full name is required";
  if (trimmed.length < 3) return "Full name must be at least 3 characters";
  return "";
};

const validateAge = (value: string) => {
  if (!value.trim()) return "Age is required";
  const num = Number(value);
  if (Number.isNaN(num)) return "Age must be a number";
  if (num <= 0) return "Age must be greater than 0";
  if (num > 120) return "Please enter a valid age";
  return "";
};

const validateMobile = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "Mobile number is required";
  if (!/^\d{10}$/.test(trimmed)) return "Mobile number must be 10 digits";
  return "";
};

const validateAddress = (value: string) => {
  if (!value.trim()) return "Address is required";
  return "";
};

const validateGender = (value: Gender) => {
  if (!value) return "Please select gender";
  return "";
};

const validateEmail = (value: string) => {
  if (!value.trim()) return "";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value.trim())) return "Please enter a valid email";
  return "";
};

const PatientDetailsForm = React.forwardRef<
  PatientDetailsFormHandle,
  PatientDetailsFormProps
>(
  (
    {
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
    },
    ref
  ) => {
    const [fullNameError, setFullNameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [emailError, setEmailError] = useState("");

    // Expose validate() to parent via ref
    useImperativeHandle(ref, () => ({
      validate: () => {
        const fullNameErr = validateFullName(fullName);
        const ageErr = validateAge(age);
        const mobileErr = validateMobile(mobile);
        const addressErr = validateAddress(address);
        const genderErr = validateGender(gender);
        const emailErr = validateEmail(email);

        setFullNameError(fullNameErr);
        setAgeError(ageErr);
        setMobileError(mobileErr);
        setAddressError(addressErr);
        setGenderError(genderErr);
        setEmailError(emailErr);

        return !(
          fullNameErr ||
          ageErr ||
          mobileErr ||
          addressErr ||
          genderErr ||
          emailErr
        );
      },
    }));

    return (
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Patient Details</Text>

        {/* Full Name */}
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          value={fullName}
          onChangeText={(text) => {
            onChangeFullName(text);
            if (fullNameError) setFullNameError(validateFullName(text));
          }}
          onBlur={() => setFullNameError(validateFullName(fullName))}
          style={[styles.input, fullNameError && styles.inputError]}
          placeholder="Enter full name"
        />
        {fullNameError ? (
          <Text style={styles.errorText}>{fullNameError}</Text>
        ) : null}

        <View style={styles.row}>
          {/* Age */}
          <View style={[styles.rowItem, { marginRight: 8 }]}>
            <Text style={styles.label}>Age *</Text>
            <TextInput
              value={age}
              onChangeText={(text) => {
                onChangeAge(text);
                if (ageError) setAgeError(validateAge(text));
              }}
              onBlur={() => setAgeError(validateAge(age))}
              keyboardType="numeric"
              style={[styles.input, ageError && styles.inputError]}
              placeholder="Enter age"
            />
            {ageError ? (
              <Text style={styles.errorText}>{ageError}</Text>
            ) : null}
          </View>

          {/* Mobile */}
          <View style={[styles.rowItem, { marginLeft: 8 }]}>
            <Text style={styles.label}>Mobile Number *</Text>
            <TextInput
              value={mobile}
              onChangeText={(text) => {
                const numeric = text.replace(/[^\d]/g, "");
                onChangeMobile(numeric);
                if (mobileError) setMobileError(validateMobile(numeric));
              }}
              onBlur={() => setMobileError(validateMobile(mobile))}
              keyboardType="phone-pad"
              style={[styles.input, mobileError && styles.inputError]}
              placeholder="10-digit mobile number"
              maxLength={10}
            />
            {mobileError ? (
              <Text style={styles.errorText}>{mobileError}</Text>
            ) : null}
          </View>
        </View>

        {/* Gender */}
        <Text style={styles.label}>Gender *</Text>
        <View style={styles.genderRow}>
          {(["Male", "Female", "Other"] as Gender[]).map((g) => {
            const selected = gender === g;
            return (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderChip,
                  selected && styles.genderChipSelected,
                ]}
                onPress={() => {
                  onChangeGender(g);
                  setGenderError(validateGender(g));
                }}
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
        {genderError ? (
          <Text style={styles.errorText}>{genderError}</Text>
        ) : null}

        {/* Address */}
        <Text style={styles.label}>Address *</Text>
        <TextInput
          value={address}
          onChangeText={(text) => {
            onChangeAddress(text);
            if (addressError) setAddressError(validateAddress(text));
          }}
          onBlur={() => setAddressError(validateAddress(address))}
          style={[
            styles.input,
            styles.multilineInput,
            addressError && styles.inputError,
          ]}
          placeholder="Enter complete address"
          multiline
        />
        {addressError ? (
          <Text style={styles.errorText}>{addressError}</Text>
        ) : null}

        {/* Email */}
        <Text style={styles.label}>Email (Optional)</Text>
        <TextInput
          value={email}
          onChangeText={(text) => {
            onChangeEmail(text);
            if (emailError) setEmailError(validateEmail(text));
          }}
          onBlur={() => setEmailError(validateEmail(email))}
          style={[styles.input, emailError && styles.inputError]}
          placeholder="Enter email address"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? (
          <Text style={styles.errorText}>{emailError}</Text>
        ) : null}
      </View>
    );
  }
);

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
  inputError: {
    borderColor: "#E53935",
  },
  errorText: {
    color: "#E53935",
    fontSize: 11,
    marginTop: 4,
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
