import * as SplashScreen from 'expo-splash-screen';
import { Platform, View } from 'react-native';
import 'react-native-reanimated';
import {  ReactNode } from 'react';
import WebAgenda from '../../components/ui/desktop/WebAgenda';
import MobileAgenda from '../../components/ui/mobile/MobileAgenda';

SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <>
      {/* Exibe Drawer para Web */}
      {Platform.OS === 'web' ? (
    <WebAgenda></WebAgenda>
      ) : (
       <MobileAgenda></MobileAgenda>
      )}
      
    </>
  );
}
