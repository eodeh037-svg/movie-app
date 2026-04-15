import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack initialRouteName='welcomescreen'>
        <Stack.Screen
        name='index'
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="welcomescreen"
    options={{headerShown:false}}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
