// MessagingScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Container from '../../../../Components/Layout/Container';
import BackButton from '../../../../Components/Global/BackButton/BackButton';
import { FontType } from '../../../../Components/Constants/FontType';
import { Dimensions } from 'react-native';
import ChatList from '../../../../Components/Chat/ChatList';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';
import { sendMessage,listenToMessages } from '../../../../Firebase/messageUtils';
import { onSendError } from '@react-native-firebase/messaging';
import { getSafeImageSource } from '../../../../utils/imageSource';

const {width,height} = Dimensions.get('window')
const isSmallScreen = height < 800
const isSmallScr = width < 400

export default function MessagingScreen({ route,navigation }: any) {

  const {provider} = route.params
  const currentUser = useSelector((state : RootState) => state.user)

  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState([])

    const chatId = [currentUser.uid, provider.uid].sort().join('_')

 useEffect(() => {
    // Start listening
    //callback
    const unsubscribe = listenToMessages(chatId, (newMessages) => {
      setMessages(newMessages)
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, [chatId]);


      const handleSendMessage = async () => {
        if (messageText.trim().length === 0) return;
    
        try {
          await sendMessage(
            chatId,
            currentUser.uid,
            // serviceProvider.uid,
            messageText
          );
          setMessageText('');
        } catch (error) {
          console.error('Error sending message:', error);
          Alert.alert('Error', 'Failed to send message');
        }
      };

  return (
    <Container style={{ justifyContent: 'flex-start' }}>
      <BackButton />
      <View style={styles.titleContainer}>
        <Text style={styles.userName}>
          {provider?.name}
        </Text>
      </View>

      {/* <Text style={styles.message}>{providerData.text || 'Provider'}</Text> */}

      {/* {providerData?.outletName ? (
  <Text style={styles.outletName}>
    {providerData.outletName}
  </Text>
) : (
  <Text style={styles.outletName}>
    TappedN User
  </Text>
)} */}

      <View style={styles.container}>
        {/* Messages List: UI structure from first, logic (inverted/renderMessage) from second */}
<ChatList
messages={messages}
currentUser={currentUser}
provider={provider}


/>

        {/* Input Area: UI structure from first, logic from second */}
        <View style={styles.messageContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.inputPill}>
              <TextInput
                style={styles.messageTextInput}
                placeholder="Type message"
                placeholderTextColor="#42526E"
                value={messageText}
                onChangeText={setMessageText}    
                returnKeyType="send"
                blurOnSubmit={false}
                // onSubmitEditing={handleSendMessage}
            
                />

              <View style={styles.iconGroup}>
              <TouchableOpacity style={{marginHorizontal : 4}}>
                <Image
                  source={getSafeImageSource(require('../../../../assets/images/Others/camera.png'), 
                    require('../../../../assets/images/Others/camera.png'))}
                  style={styles.cameraIcon}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginHorizontal : 4}}>
                <Image
                  source={getSafeImageSource(require('../../../../assets/images/Others/emoji.png'), 
                      require('../../../../assets/images/Others/emoji.png'))}
                  style={styles.emojiIcon}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleSendMessage}
              style={styles.sendButtonContainer}
            >
              <Image
                source={getSafeImageSource(require('../../../../assets/images/Others/send.png'), 
                  require('../../../../assets/images/Others/send.png'))}
                style={styles.sendButton}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
}
// Styles remain the same...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    // backgroundColor: 'yellow',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    width: '100%',
    // backgroundColor : 'yellow',
    flexDirection: 'row',
  },

  // title: {
  //   fontSize: FontType.titleBold2,
  //   fontWeight: '900',
  //   color: '#F27122',
  //   textAlign: 'center',
  // },
  // message: {
  //   color: '#000',
  //   fontSize: FontType.medium,
  //   fontWeight: '700',
  // },

     userName: {
        fontSize: FontType.xxxlarge,
        color: '#263238',
        fontWeight: '600',
        marginTop: 7,
      },

   messageContainer: {
        width: '100%',
        // backgroundColor: '#F27122',
      backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: isSmallScreen? 100 : 140,
        // paddingBottom: 30,
        // paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        // paddingHorizontal: 10,
        // borderRadius : 20,
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'space-evenly',
        // backgroundColor: 'blue',
        paddingHorizontal: 15,
        paddingRight : 70,
        width: '100%',
      },
      inputPill: {
        flex: 0,
        borderRadius : 8,
        paddingHorizontal : 6,
        alignItems : 'center',
        minHeight : 50,
         backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        marginRight : 10
      },
      messageTextInput: {
        flex: 1,
        height: 50,
        // backgroundColor: 'transparent',
        // backgroundColor : '#cdcdcd',
        color : '#42526E',
        borderRadius: 8,
        paddingHorizontal: 12,
        // marginRight: 10,
        maxHeight : 140,
        fontSize : FontType.regular
      },
      iconGroup:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        
      },
      sendButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F27122',
        width: 46,
        height: 46,
        borderRadius: 7,
        marginBottom: 2,
        marginHorizontal : 6
      },
      sendButton: {
        width: 28,
        height: 28,
      },

  cameraIcon: {
    width: 26,
    height: 22,
    alignSelf: 'center',
    // marginLeft: 10,
  },
  emojiIcon: {
    width: 26,
    height: 22,
    alignSelf: 'center',
    // marginLeft: 10,
  },



});
