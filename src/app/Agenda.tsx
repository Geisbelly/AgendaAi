import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import 'react-native-reanimated';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Ionicons } from '@expo/vector-icons';
import { Children, ReactNode } from 'react';
import App from './Agenda';
import WebAgenda from '@/components/ui/desktop/WebAgenda';
import MobileAgenda from '@/components/ui/mobile/MobileAgenda';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <>
      {/* Exibe Drawer para Web */}
      {Platform.OS === 'web' ? (

        <View><WebAgenda></WebAgenda></View>
      ) : (

       <View style={{ flex: 1 }}>
       <MobileAgenda></MobileAgenda>
        </View>
      )}

      <StatusBar style="auto" />
    </>
  );
}
