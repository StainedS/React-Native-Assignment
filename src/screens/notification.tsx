import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {theme} from '../Theme/Theme';
import notifee from '@notifee/react-native';
const notification = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'NordStone Notification',
      body: 'Required Assignment Notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%',
      }}>
      <TouchableOpacity onPress={onDisplayNotification}>
        <View
          style={{
            height: 200,
            width: 200,
            borderRadius: 200,
            backgroundColor: theme.color.red,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default notification;

const styles = StyleSheet.create({});
