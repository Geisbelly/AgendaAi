import React from 'react';
import { Platform } from 'react-native';
import MobileAgenda from '../components/ui/mobile/MobileAgenda';
import WebAgenda from '../components/ui/desktop/WebAgenda';

const Scheduler = () => {
  return Platform.OS === 'web' ? <WebAgenda /> : <MobileAgenda  />;
};

export default Scheduler;
