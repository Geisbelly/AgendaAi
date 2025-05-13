import { Platform, View, Text } from 'react-native';
import 'react-native-reanimated';
import {  ReactNode } from 'react';


export default function RootLayout() {

  return (
    <View>
      {/* Exibe Drawer para Web */}
      {Platform.OS === 'web' ? (
    <View><Text>WEB</Text></View>
      ) : (
       <View><Text>MOBILE</Text></View>
      )}
      
    </View>
  );
}