import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import React, { useState } from 'react';
import { FontType } from '../../Components/Constants/FontType';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/navigation';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height } = Dimensions.get('window');
const isSmallScreen = height < 800;

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleProfileSettings = () => {
    navigation.navigate('ProfileSettings');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel' },
      { text: 'Logout', onPress: () => navigation.navigate('Login') },
    ]);
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.options}
          activeOpacity={0.5}
          onPress={handleProfileSettings}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/HomeTabs/Settings/profile-settings.png')}
              style={styles.icon}
            />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>Profile Settings</Text>
            </View>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={handleProfileSettings}
            >
              <Image
                source={require('../../assets/images/HomeTabs/Settings/arrow-button.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.options}
          activeOpacity={0.5}
          onPress={handleChangePassword}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/HomeTabs/Settings/change-password.png')}
              style={styles.icon}
              resizeMode="cover"
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>Change Password</Text>
            </View>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={handleChangePassword}
            >
              <Image
                source={require('../../assets/images/HomeTabs/Settings/arrow-button.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.options}
          activeOpacity={0.5}
          onPress={handlePrivacyPolicy}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/HomeTabs/Settings/privacy-policy.png')}
              style={styles.icon}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>Privacy Policy</Text>
            </View>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={handlePrivacyPolicy}
            >
              <Image
                source={require('../../assets/images/HomeTabs/Settings/arrow-button.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.options}
          activeOpacity={0.5}
          onPress={handleLogout}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/HomeTabs/Settings/logout.png')}
              style={styles.icon}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>Logout</Text>
            </View>
            <TouchableOpacity style={styles.arrowButton} onPress={handleLogout}>
              <Image
                source={require('../../assets/images/HomeTabs/Settings/arrow-button.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.options} activeOpacity={0.5}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/HomeTabs/Settings/dark-mode.png')}
              style={styles.icon}
            />
          </View>
          <View style={styles.darkModeRowContainer}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>Dark Mode</Text>
            </View>

            <TouchableOpacity
              style={styles.darkmodeButton}
              onPress={() => setIsDarkMode(prev => !prev)}
            >
              {isDarkMode ? (
                <>
                  <Image
                    source={require('../../assets/images/HomeTabs/Settings/temp1.png')}
                    style={styles.darkmodeIcon}
                    resizeMode="cover"
                  />
                  <Image
                    source={require('../../assets/images/HomeTabs/Settings/temp2.png')}
                    style={styles.darkmodeIcon2}
                    resizeMode="cover"
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require('../../assets/images/HomeTabs/Settings/temp3.png')}
                    style={styles.darkmodeIcon3}
                    resizeMode="cover"
                  />
                  <Image
                    source={require('../../assets/images/HomeTabs/Settings/temp4.png')}
                    style={styles.darkmodeIcon}
                    resizeMode="cover"
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    // backgroundColor: 'orange',
    justifyContent: 'center',
    width: '85%',
    marginTop: isSmallScreen? '20%' :'4%',
  },
  title: {
    fontSize: FontType.titleBold2,
    fontWeight: '900',
    color: '#263238',
  },

  mainContainer: {
    // backgroundColor: 'red',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '85%',
    marginTop: isSmallScreen? '8%' : '10%',
  },
  options: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: isSmallScreen? '13.5%' : '12.4%',
    // height : 60,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    // shadowOpacity : 0.25,
    // shadowRadius : 3.84,
    elevation: 5,
    gap: 12,
  },
  imageContainer: {
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: '14%',
    height: '100%',
    marginLeft: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    marginLeft: -4,
    // backgroundColor: 'green',
  },
  optionTextContainer: {
    // height: '50%',
    // width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'pink',
  },
  optionText: {
    fontSize: FontType.medium,
    color: '#263238',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 600,
  },
  arrowButton: {
    // backgroundColor: 'orange',
    // width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    // height : '90%',
  },
  arrowIcon: {
    color: '#42526E50',
    width: 15,
    height: 15,
    marginRight: 8,
  },
  darkModeRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    marginLeft: -4,
    // backgroundColor: 'pink',
  },
  darkmodeButton: {
    flexDirection: 'row',
    backgroundColor: '#F27122',
    borderRadius: 25,
    width: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  darkmodeIcon: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
  },
  darkmodeIcon2: {
    width: 22,
    height: 22,
    marginRight: 8,
    resizeMode: 'cover',
  },
  darkmodeIcon3: {
    width: 18,
    height: 18,
    marginLeft: 8,
    resizeMode: 'cover',
  },
});
