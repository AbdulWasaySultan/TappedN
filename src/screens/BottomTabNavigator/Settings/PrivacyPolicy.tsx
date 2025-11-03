import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import { FontType } from '../../../Components/Constants/FontType';

const { height } = Dimensions.get('window');
const isSmallScreen = height < 800;

  export default function PrivacyPolicy() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <BackButton />
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Privacy Policy</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.heading}>Terms For Use</Text>
            <Text style={styles.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Text>

            <Text style={[styles.heading, { marginTop: '10%' }]}>
              Request Accepting/Rejecting
            </Text>
            <Text style={styles.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    // backgroundColor : 'red',
    flex: 1,
    width: '92%',
    alignSelf: 'center',
    marginVertical: '20%',
  },
  titleContainer: {
    // backgroundColor : 'blue',
    width: '88%',
    alignSelf: 'center',
    marginTop: isSmallScreen? '20%' : '18%',
  },
  title: {
    fontSize: FontType.titleBold2,
    fontWeight: 900,
    color: '#263238',
  },

  contentContainer: {
    // backgroundColor : 'blue',
    width: '88%',
    alignSelf: 'center',
    marginTop: '13%',
  },
  heading: {
    fontSize: FontType.large,
    fontWeight: 700,
    color: '#263238',
    marginBottom: 20,
  },
  content: {
    fontSize: FontType.regular,
    fontWeight: 400,
    color: '#42526E70',
    marginLeft: 1,
  },
});
