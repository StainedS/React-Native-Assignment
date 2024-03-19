/* eslint-disable prettier/prettier */
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FIREBASE_AUTH} from '../Firebase/firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  signInWithEmailAndPassword;
  const handleSignUp = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !email.trim() || !emailPattern.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!password || !password.trim()) {
      Alert.alert('Invalid Password', 'Please enter a password.');
      return;
    }

    const strongPasswordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!strongPasswordPattern.test(password)) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      );
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(userCredential => {
        // Signed up
        console.log(userCredential);
        // ...
      })
      .catch(error => {
        Alert.alert('An error', `${error}`);
        // ..
      });
  };
  const handleLogIn = () => {
    // Implement sign-up logic here
    console.log('Email:', email);
    console.log('Password:', password);
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(userCredential => {
        // Signed in
        console.log(userCredential);
        // ...
      })
      .catch(error => {
        Alert.alert('error', `${error}`);
      });
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic here
    sendPasswordResetEmail(FIREBASE_AUTH, email)
      .then(() => {
        Alert.alert('reset mail sent', 'Reset mail was sent to your email');
      })
      .catch(error => {
        Alert.alert('error', `${error}`);
      });
    console.log('Forgot password');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogIn}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  forgotPassword: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
