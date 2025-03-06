const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    alias: {
      ...defaultConfig.resolver.alias,
      'react-native-month-year-picker': path.resolve(__dirname, 'src/emptyModule.js'), // Define um módulo vazio para a Web
    },
  },
};
