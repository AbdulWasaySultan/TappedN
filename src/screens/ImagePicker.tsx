import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary, launchCamera, MediaType } from 'react-native-image-picker';
import Container from '../components/container';
import { Image } from 'react-native';

export default function ImagePicker() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openGallery = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } 
      else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri || null);
      } 
    //   else {
    //     let imageUri = response.assets?.[0]?.uri;
    //     setSelectedImage(imageUri);
    //   }
    });
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage)
      }
       else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri || null)
      } 
    }
    );
  }
  return (
    <Container>

        {selectedImage && (
            <Image
        source={{uri : selectedImage}}
        style={styles.image}
        resizeMode="contain"
        />
    )}
      <TouchableOpacity onPress={openGallery} style={styles.button}>
        <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Text style={styles.buttonText}>Take a Photo</Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
image : {
   width: '100%',
  height: 300,
  marginVertical: 20,
  borderRadius: 8,
},
button: {
 backgroundColor: '#007bff',
  padding: 15,
  borderRadius: 8,
  marginTop: 20,
  alignItems: 'center',
},
buttonText:{
color: '#fff',
  fontSize: 16,
}
});
