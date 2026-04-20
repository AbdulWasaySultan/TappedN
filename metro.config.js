const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  // Helps prevent the "undefined" JSON error by limiting 
  // parallel processes on your 16GB Intel Mac
  maxWorkers: 2, 
  resetCache: true,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // This reduces memory pressure at startup
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);