import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import 'react-native-reanimated';
import { Tabs } from 'expo-router';
import { Drawer } from 'expo-router/drawer'; // Importando a versão correta do Drawer para expo-router
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
        // <Drawer>
        //   <Drawer.Screen name="Agenda" options={{ title: 'Agenda' }} initialParams={[WebAgenda]}/>
        // </Drawer>
        <View><WebAgenda></WebAgenda></View>
      ) : (
        // Exibe Tabs para dispositivos móveis
        // <Tabs
        //   screenOptions={{
        //     headerShown: false,
        //     tabBarButton: HapticTab,
        //     tabBarBackground: TabBarBackground,
        //     tabBarStyle: Platform.select({
        //       ios: {
        //         // Use a transparent background on iOS to show the blur effect
        //         position: 'absolute',
        //       },
        //       default: {},
        //     }),
        //   }}
        // >
        //   <Tabs.Screen
        //     name="Agenda"
            
        //     options={{
        //       title: 'Agenda',
        //       tabBarStyle: {boxShadow: '1px 0px 2px rgba(30, 127, 206, 0.39)', height: 58},
        //       tabBarIcon: ({ color, focused }) => (
        //         <Ionicons
        //           name={focused ? "calendar" : "calendar-outline"}
        //           size={30}
        //           color={'rgba(21, 128, 235, 0.8)'}
        //         />
        //       ),
        //     }}
        //   />
        // </Tabs>
       <View style={{ flex: 1 }}>
       <MobileAgenda></MobileAgenda>
        </View>
      )}

      <StatusBar style="auto" />
    </>
  );
}
