import { View, Text, FlatList } from 'react-native';
import React, { useCallback } from 'react';

export default function WindowService() {
  return (
    <View>
      <Text>WindowService</Text>
      <FlatList
      data={'jjj'}
      start
      />
    </View>
  );
}

// You have a FlatList with 1000 items, and it's laggy when scrolling. What are 5 specific 
// optimizations you would implement? Explain each one.

// i would check the renderItem function
// i would reduce the initial num to reduce and add onRefresh
// ill add an activity indicator while the items are loading
// ill add pagination
// ill use lazy loading
// ill use usememo


