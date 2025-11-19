import { Stack } from "expo-router";

export default function ScreenLayout() {
  return (
    <Stack>
      <Stack.Screen name="CartScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
