import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';


export default function RootLayout() {


  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="agenda" options={{ headerShown: false }} />
        <Stack.Screen name="listaAgendas" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );

}

