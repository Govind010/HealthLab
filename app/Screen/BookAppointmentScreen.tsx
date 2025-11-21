import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useMemo, useRef, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text } from "react-native";

import { CartItem, cartData } from "../../Data/cartData";
import AppointmentScheduleCard from "../../components/AppointmentScheduleCard";
import BookingSummaryCard from "../../components/BookingSummaryCard";
import PatientDetailsForm, {
  Gender,
  PatientDetailsFormHandle,
} from "../../components/PatientDetailsForm";

const HOME_COLLECTION_CHARGE = 125;
const FREE_HOME_COLLECTION_THRESHOLD = 500;

function priceToNumber(price: string): number {
  const numeric = price.replace(/[^\d]/g, "");
  return Number(numeric) || 0;
}

export default function BookAppointmentScreen() {
  // Patient details
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  // Appointment schedule
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  // Ref to access form methods
  const formRef = useRef<PatientDetailsFormHandle | null>(null);

  // Booking summary (from cartData)
  const cartTests: CartItem[] = useMemo(() => cartData, []);
  const subtotal = cartTests.reduce(
    (sum, test) => sum + priceToNumber(test.price),
    0
  );
  const hasFreeHomeCollection = subtotal >= FREE_HOME_COLLECTION_THRESHOLD;
  const visitingCharge = hasFreeHomeCollection ? 0 : HOME_COLLECTION_CHARGE;
  const totalAmount = subtotal + visitingCharge;

  // Nicely formatted date string for the card
  const selectedDateLabel = useMemo(() => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [selectedDate]);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    // On Android event.type will be "set" or "dismissed"
    // On iOS this may fire multiple times; we still close on first change for simplicity
    if (event.type === "set" && date) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const handleConfirmBooking = () => {
    const isFormValid = formRef.current?.validate() ?? false;
    const isScheduleValid = !!selectedDate && !!selectedSlot;

    if (!isFormValid || !isScheduleValid) {
      let message = "";
      if (!isFormValid && !isScheduleValid) {
        message =
          "Please correct the highlighted patient details and select a date and time slot.";
      } else if (!isFormValid) {
        message = "Please correct the highlighted patient details.";
      } else {
        message = "Please select a date and time slot for your appointment.";
      }

      Alert.alert("Missing information", message);
      return;
    }

    // All good, proceed with API / navigation
    console.log({
      fullName,
      age,
      gender,
      mobile,
      address,
      email,
      selectedDateISO: selectedDate?.toISOString(),
      selectedSlot,
      cartTests,
      totalAmount,
    });

    Alert.alert(
      "Booking Confirmed",
      "Your appointment has been booked successfully."
    );
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.screenTitle}>Book Appointment</Text>
        <Text style={styles.subtitle}>
          Fill in your details for home sample collection
        </Text>

        <PatientDetailsForm
          ref={formRef}
          fullName={fullName}
          age={age}
          gender={gender}
          mobile={mobile}
          address={address}
          email={email}
          onChangeFullName={setFullName}
          onChangeAge={setAge}
          onChangeGender={setGender}
          onChangeMobile={setMobile}
          onChangeAddress={setAddress}
          onChangeEmail={setEmail}
        />

        <AppointmentScheduleCard
          selectedDate={selectedDateLabel}
          selectedSlot={selectedSlot}
          onPressDatePicker={() => setShowDatePicker(true)}
          onSelectTimeSlot={setSelectedSlot}
        />

        <BookingSummaryCard
          cartTests={cartTests}
          subtotal={subtotal}
          visitingCharge={visitingCharge}
          totalAmount={totalAmount}
          onConfirmBooking={handleConfirmBooking}
        />
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={new Date()} // no past dates
          onChange={handleDateChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 13,
    color: "#6F6F6F",
  },
});
