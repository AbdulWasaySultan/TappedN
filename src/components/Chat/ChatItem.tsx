import React, { useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet, FlatList } from 'react-native'
import { FontType } from '../Constants/FontType';
import { Dimensions } from 'react-native';
import SafeImage from '../Global/SafeImage';

const {width,height} = Dimensions.get('window')

const isSmallScreen = height < 800
const isSmallScr = width < 400

// export default function ChatItem({item, isMine,provider, currentUser} :  any) {
// actually these 4 params which are (commented should be/are) passed and used in the chatitem screen via route
export default function ChatItem({children,navigation,route} :  any) {
    const [messages, setMessages] = useState()
    // const isMine = item.senderId === currentUser.uid;
    
    useEffect(()=> {
            // console.log('Rendering message:', {
    //   messageId: item.id,
    //   senderId: item.senderId,
    //   currentUserUid: currentUser.uid,
    //   isMine: isMine,
    //   text: item.text,
    // });
    })

    return (
      <View
        style={[
          styles.messageCell,
          route.isMine ? styles.myMessageRow : styles.theirMessageRow,
        ]}
      >
        {/* Service Provider's Profile Image (Left Side) */}
        {!route.isMine && (
          <SafeImage
            uri={route.provider?.profileImage}
            fallbackSource={require('../../assets/images/Others/YouAvatar.png')}
            style={styles.profileImage}
            deferUntilInteractions
          />
        )}
        
        {/* Message Bubble */}
        <View
          style={[
            styles.messageField,
            route.isMine ? styles.myMessageBubble : styles.theirMessageBubble,
          ]}
        >
          <Text style={route.isMine ? styles.myMessageText : styles.theirMessageText}>
            {route.item.text}
          </Text>
        </View>

        {/* Current User's Profile Image (Right Side) */}
        {route.isMine && (
          <SafeImage
            uri={route.currentUser?.profileImage}
            fallbackSource={require('../../assets/images/Others/MeAvatar.png')}
            style={styles.profileImage}
            deferUntilInteractions
          />
        )}
      </View>
    );
};

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
  })