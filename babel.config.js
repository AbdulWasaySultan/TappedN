module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Conditionally include worklets plugin only for Android
    ...(process.env.PLATFORM === 'android' ? ['react-native-worklets/plugin'] : []),
    // Reanimated plugin must be last
    'react-native-reanimated/plugin',
  ],
};