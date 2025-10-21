import { Stack } from 'expo-router';

export default function VisaLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevent swipe back to ensure data integrity
      }}
    >
      <Stack.Screen name="travel-plans" />
      <Stack.Screen name="visa-selection" />
      <Stack.Screen name="trip-details" />
      <Stack.Screen name="passport-upload" />
      <Stack.Screen name="personal-details" />
    </Stack>
  );
}
