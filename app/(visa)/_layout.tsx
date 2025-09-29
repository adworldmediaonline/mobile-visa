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
      <Stack.Screen name="residency-details" />
      <Stack.Screen name="passport-details" />
      <Stack.Screen name="travelers" />
      <Stack.Screen name="processing-options" />
      <Stack.Screen name="order-review" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="confirmation" />
    </Stack>
  );
}
