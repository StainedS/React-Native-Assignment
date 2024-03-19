/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';

import {StyleSheet} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './Navigation/navigation';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
