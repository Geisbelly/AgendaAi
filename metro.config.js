const { getDefaultConfig } = require('metro-config');

module.exports = {
  ...getDefaultConfig(),
  resolver: {
    blockList: [
      /node_modules\/react-native\/.*/,
      // Adicione outras pastas se necessário
    ],
  },
};
