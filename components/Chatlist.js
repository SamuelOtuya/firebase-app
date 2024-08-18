import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useAuth } from '../context/authContext'

export default function Chatlist({users}) {
  return (
    <View className="flex-1">
      <FlatList data={users} contentContainerStyle={{flex:1,paddingVertical:25}}
      showsVerticalScrollIndicator={false} keyExtractor={item=>Math.random()} renderItem={({item,index})=><ChatItem item={item}/>}/>
      </View>
  )
}