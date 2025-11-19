import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { CartItem, cartData } from "../Data/cartData";
import AppointmentScheduleCard from "../components/AppointmentScheduleCard";
import BookingSummaryCard from "../components/BookingSummaryCard";
import PatientDetailsForm, { Gender } from "../components/PatientDetailsForm";

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
  const [selectedDate, setSelectedDate] = useState(""); // plug in a date picker later
  const [selectedSlot, setSelectedSlot] = useState("");

  // Booking summary (from cartData)
  const cartTests: CartItem[] = useMemo(() => cartData, []);
  const subtotal = cartTests.reduce(
    (sum, test) => sum + priceToNumber(test.price),
    0
  );
  const hasFreeHomeCollection = subtotal >= FREE_HOME_COLLECTION_THRESHOLD;
  const visitingCharge = hasFreeHomeCollection ? 0 : HOME_COLLECTION_CHARGE;
  const totalAmount = subtotal + visitingCharge;

  const handleConfirmBooking = () => {
    // TODO: validate and call API / navigate
    console.log({
      fullName,
      age,
      gender,
      mobile,
      address,
      email,
      selectedDate,
      selectedSlot,
      cartTests,
      totalAmount,
    });
  };

  return (
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
        selectedDate={selectedDate}
        selectedSlot={selectedSlot}
        onPressDatePicker={() => {
          // hook your DatePicker modal here and call setSelectedDate(...)
          console.log("Open date picker");
        }}
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
