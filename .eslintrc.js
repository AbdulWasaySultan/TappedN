module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: [
    'build.js',
    'node_modules/',
    'android/',
    'ios/',
    'Pods/',
    'build/',
    '.metro-bundler-cache/',
    'dist/'
  ],
  rules: {
    "import/first": "off"
  }
};
