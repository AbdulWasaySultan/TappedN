import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontType } from '../Constants/FontType';
import SafeImage from '../Global/SafeImage';

export default function ChatItem({ item, isMine, provider, currentUser }: any) {
  const [messages, setMessages] = useState();

  useEffect(() => {
    console.log("Message:", item.text, "isMine:", isMine, "SenderId:", item.senderId, "CurrentUID:", currentUser.uid);
  }, []);

  return (
    <View
      style={[
        styles.messageCell,
        isMine ? styles.myMessageRow : styles.theirMessageRow,
      ]}
    >
      {/* Service Provider's Profile Image (Left Side) */}
      {!isMine && (
        <SafeImage
          uri={provider?.profileImage}
          fallbackSource={require('../../assets/images/Others/YouAvatar.png')}
          style={styles.profileImage}
        />
      )}

      {/* Message Bubble */}
      <View
        style={[
          styles.messageField,
          isMine ? styles.myMessageBubble : styles.theirMessageBubble,
        ]}
      >
        <Text style={isMine ? styles.myMessageText : styles.theirMessageText}>
          {item.text}
          {/* {loadChatCells.lastmessagestamp} */}
        </Text>
      </View>

      {/* Current User's Profile Image (Right Side) */}
      {isMine && (
        <SafeImage
          uri={currentUser?.profileImage && currentUser.profileImage !== "" ? currentUser.profileImage : null}
          fallbackSource={require('../../assets/images/Others/MeAvatar.png')}
          style={styles.profileImage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  messageCell: {
    width: '100%',
    marginVertical: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  messageField: {
    borderRadius: 10,
    padding: 12,
    maxWidth: '75%', // Max 75% of screen for flexible bubbles
    justifyContent: 'center',
  },
  myMessageBubble: {
    backgroundColor: '#F2F2F2',
    borderTopRightRadius: 2,
    alignSelf: 'flex-end',
  },
  theirMessageBubble: {
    backgroundColor: '#FDECE1',
    borderTopLeftRadius: 2,
    alignSelf: 'flex-start',
  },
  myMessageText: {
    fontSize: FontType.regular,
    color: '#42526E',
    flexWrap: 'wrap',
  },
  theirMessageText: {
    fontSize: FontType.regular,
    color: '#FFF',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    marginLeft: 10,
  },
  outletName: {
    fontSize: FontType.regular,
    color: '#000',
    fontWeight: '700',
    marginTop: 2,
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    justifyContent: 'flex-start',
  },
  // theirMessageText: {
  //   fontSize: FontType.regular,
  //   color: '#333',
  //   flexWrap: 'wrap',
  // },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
});
