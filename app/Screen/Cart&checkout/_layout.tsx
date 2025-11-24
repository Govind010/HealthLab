import { Stack } from "expo-router";

export default function CartAndcheckoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartScreen" />
      <Stack.Screen name="BookAppointmentScreen" />
    </Stack>
  );
}
