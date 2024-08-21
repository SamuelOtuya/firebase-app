import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {blurhash} from "../utils/common"


export default function ChatItem({ item ,noBorder,router}) {
  const openChatRoom=()=>{router.push({pathname:'/chatRoom',params:item})}
  
  return (
<TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between items-center mx-4 gap-3 mb-4 pb-2  ${noBorder? '': 'border-b border-b-neutral-200'}`}>
      <Image
        source={{uri: item?.profileurl}}
        style={{ height: hp(7), width: hp(7) }}
        className="rounded-full"
        placeholder={blurhash}
        transition={500}
      />
      {/* name and last message */}
      <View className="flex-1 gap-1">
        <View
          className="flex-row
     justify-between"
        >
          <Text
            style={{ fontSize: hp(2.0) }}
            className="font-semibold text-neutral-950"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-medium text-neutral-600"
          >
            Time
          </Text>
        </View>
        <Text style={{ fontSize: hp(1.8) }} className=" text-neutral-600">
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
}
