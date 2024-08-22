import { View, Text } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function MessageItem({ message, currentUser }) {

  // Log the userId values for debugging
  console.log('Current User ID:', currentUser?.userId);
  console.log('Message User ID:', message?.user);

  // Check if the message belongs to the current user
  if (currentUser?.userId === message?.user) {
    // Render the current user's message
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 12, marginRight: 12 }}>
        <View style={{ width: wp(80) }}>
          <View style={{ alignSelf: 'flex-end', padding: 12, borderRadius: 20, backgroundColor: 'white', borderColor: '#d3d3d3', borderWidth: 1 }}>
            <Text style={{ fontSize: hp(1.8) }}>
              {message?.text}
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    // Render other users' messages
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 12, marginLeft: 12 }}>
        <View style={{ width: wp(80) }}>
          <View style={{ alignSelf: 'flex-start', padding: 12, borderRadius: 20, backgroundColor: '#475569', borderColor: '#d3d3d3', borderWidth: 1 }}>
            <Text style={{ fontSize: hp(1.8), color: 'white' }}>
              {message?.text}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
