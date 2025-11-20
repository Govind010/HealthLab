import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "./Data/toastConfig";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Screen" options={{ headerShown: false }} />
      </Stack>

      <Toast config={toastConfig} />
    </>
  );
}
