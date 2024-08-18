import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default function ChatItem({item}) {
  return (
  <TouchableOpacity 
className="flex-row justify-between items-center mx-4 gap-3 mb-4 pb-2 border-b border-b-neutral-200"
>
<Image 
source={require('../assets/images/user.jpg')}
style={{height:hp(7) ,width:hp(7)}}
className="rounded-full"/>
{/* name and last message */}
<View className="flex-1 gap-1">
    <View className="flex-row
     justify-between">
        <Text style={{fontSize:hp(2.0)}} className="font-semibold text-neutral-950">Sam</Text>
        <Text style={{fontSize:hp(1.8)}} className="font-medium text-neutral-950">Time</Text>
     </View>
     <Text style={{fontSize:hp(1.8)}} className=" text-neutral-950">Last message</Text>
    </View>
   </TouchableOpacity>

   
  )
}