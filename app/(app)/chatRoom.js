import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ChatRoom() {
  const [messages,setMessages]=useState([]);
  const item=useLocalSearchParams();
  console.log('got item data',item);
  return (
    <View className="flex-1 bg-white">
      <ChatRoomHeader user={item} router={router}/>
      <View className="border-b h-0.8 border-neutral-400"/>
      <View className="justify-between flex-1 bg-neutral-200 overflow-visible">
      <View className="flex-1">
        <MessageList messages={messages}/>
        </View>
        <View style={{marginBottom:hp(1.7)}} className="pt-2">
          <View className="flex-row justify-between mx-1 items-center">
            <View className="bg-white flex-row justify-between border p-1.5 border-neutral-300 rounded-2xl">
<TextInput
placeholder=' type message...'
style={{fontSize:hp(2)}}
className="flex-1 mr-2 mx-1 "
/>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}