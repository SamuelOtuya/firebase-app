import { View, Text, Touchable, TouchableOpacity , Image} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
// import { Image } from "expo-image";

export default function ChatRoomHeader({ user, router} ) {
    console.log(user?.profileurl?.profileUrl)
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: 'false',
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <Image              
                source={{uri:user?.profileurl}}
                style={{ height:40,width:40, aspectratio: 1, borderWidth:1, borderRadius: 100 }}
                />
              <Text fontSize={hp(2.5 )} className="text-neutral-700 font-medium">
                {user?.username}
              </Text>
            </View>
            
          </View>
        ),
        headerRight: ()=>(
            <View className="flex-row items-center gap-6">
<Ionicons name="call" size={20} color="#737373" />
<Ionicons name="videocam" size={20} color="#737373" />
            </View>
        )
      }}
    />
  );
}
