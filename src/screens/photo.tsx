/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import React, {useCallback, useState} from 'react';
import {FIREBASE_STORAGE} from '../Firebase/firebase';
import {useFocusEffect} from '@react-navigation/native';

const photo = () => {
  const [image, setImage] = useState('');
  const [uploadedimage, getImage] = useState('');

  const uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  };
  const uploadImage = async () => {
    const uri = image;
    const imageref = ref(FIREBASE_STORAGE, `Pictures/Image.jpg`);
    console.log(` imageref`);
    const blobFile = await uriToBlob(uri);
    try {
      await uploadBytes(imageref, blobFile).then(async snapshot => {
        console.log('snapshot', snapshot);
        const url = await getDownloadURL(imageref);
        return url;
      });
    } catch (err) {
      console.log(err);
      return null;
    }
    console.log('Uploaded a blob or file!');
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    setImage(null);
  };

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      console.log(`${image.path}`);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      console.log(`${image.path}`);
    });
  };

  useFocusEffect(
    useCallback(() => {
      const getImageUrl = () => {
        const ImageRef = ref(FIREBASE_STORAGE, 'Pictures/Image.jpg');
        getDownloadURL(ImageRef)
          .then(url => {
            getImage(() => {
              return url;
            });
          })
          .catch(error => {
            console.log(error);
          });
      };
      setInterval(function () {
        getImageUrl();
      }, 10000);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.selectButton} onPress={openCamera}>
        <Text style={styles.buttonText}>Click an image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{uri: image}} style={styles.imageBox} />
        ) : null}
        {
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload image</Text>
          </TouchableOpacity>
        }
      </View>
      <Text> Uploaded Image: </Text>
      <Image
        source={{
          uri: uploadedimage,
        }}
        style={{width: 200, height: 200}}
      />
    </SafeAreaView>
  );
};

export default photo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#bbded6',
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 200,
    height: 200,
  },
});
