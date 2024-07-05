import { View, Text, Platform } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";

const ios = Platform.OS == "ios";
export default function HomeHeader() {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between px-5 bg-indigo-400 rounded-b-3xl pb-6 shadow"
    >
      <View>
        <Text style={{ fontSize: hp(4) }} className="text-white font-medium">
          Chats
        </Text>
      </View>
      <View>
        <Image
          style={{ height: hp(5), aspectRatio: 1, borderRadius: 100 }}
          source="https://picsum.photos/seed/696/3000/2000"
          placeholder={blurhash}
          transition={500}
        />
      </View>
    </View>
  );
}
