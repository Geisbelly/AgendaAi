import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  // Carrega as fontes
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // Verifica se as fontes foram carregadas e esconde o splash screen
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      // Redireciona para a página Agenda assim que as fontes forem carregadas
      //router.replace('/u/Agenda');
    }
  }, [fontsLoaded, router]);

  if (!fontsLoaded) {
    return null; // Não renderiza nada até que as fontes estejam carregadas
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found"  initialParams={RootLayout} />
      </Stack>
    </ThemeProvider>
  );
}
