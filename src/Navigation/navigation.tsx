/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import SignUp from '../screens/signUp';
import notification from '../screens/notification';
import photo from '../screens/photo';
import text from '../screens/text';
import calculator from '../screens/calculator';
import {User, onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from '../Firebase/firebase';
import Calculator from '../screens/calculator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, data => {
      setUser(() => {
        return data;
      });
    });
  }, []);
  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Notification" component={notification} />
          <Tab.Screen name="Photo" component={photo} />
          <Tab.Screen name="Text" component={text} />
          <Tab.Screen name="Calculator" component={Calculator} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen component={SignUp} name="signUp" />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
