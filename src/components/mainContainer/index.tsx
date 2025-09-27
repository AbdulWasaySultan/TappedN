// src/Components/MainContainer.tsx

import React, { FC } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface MainContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const MainContainer: FC<MainContainerProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container fills the available space
    backgroundColor: '#fff', // A default background color4
  },
});

export default MainContainer;