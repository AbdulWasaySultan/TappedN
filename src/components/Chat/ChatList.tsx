import React from 'react';
import ChatItem from './ChatItem';
import { FlatList, StyleSheet } from 'react-native';

export default function ChatList({ messages, currentUser, provider }: any) {
  
  const renderItem = ({ item }: { item: any }) => {
    const isMine = item.senderId === currentUser.uid;
    return (
      <ChatItem
        item={item}
        isMine={isMine}
        provider={provider}
        currentUser={currentUser}
      />
    );
  };

  return (
    <>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        // Keeps your logic
        contentContainerStyle={styles.flatListContainer}
        scrollEnabled={true}
        inverted
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}


const styles = StyleSheet.create({
  flatListContainer:{

  }
})
