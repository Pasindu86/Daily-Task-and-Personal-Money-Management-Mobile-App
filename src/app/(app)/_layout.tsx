import { useAuth } from '@/contexts/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
  const { session, loading } = useAuth();

  // If the user is not signed in, redirect back to login
  if (!loading && !session) {
    return <Redirect href={'/(auth)/login' as any} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
