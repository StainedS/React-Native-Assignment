/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { FIREBASE_DB } from '../Firebase/firebase';

const TextScreen = () => {
  const [inputText, setInputText] = useState('');
  const [fetchedText, setFetchedText] = useState<object[]>([]);

  async function uploadTextToFirebase(textObject: { Text: string }) {
    try {
      await addDoc(collection(FIREBASE_DB, 'NordstoneData'), textObject);
      setInputText('');
    } catch (error) {
      console.error('Error uploading text:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const unsub = onSnapshot(collection(FIREBASE_DB, 'NordstoneData'), snapshot => {
        const tempArray = snapshot.docs.map(doc => doc.data());
        setFetchedText(tempArray);
      });

      return () => unsub();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button
        title="Send and Save"
        onPress={() => {
          if (inputText.trim() !== '') {
            uploadTextToFirebase({ Text: inputText });
          } else {
            console.error('Text cannot be empty');
          }
        }}
      />
      <View>
        {fetchedText.map((item, index) => (
          <Text key={index} style={styles.fetchedText}>{item.Text}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  fetchedText: {
    marginTop: 20,
  },
});

export default TextScreen;
