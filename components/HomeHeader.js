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
import { useAuth } from "../context/authContext";
import { blurhash } from "../utils/common";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from "./CustomMenuItems";
import { Feather } from "@expo/vector-icons";

const ios = Platform.OS == "ios";
export default function HomeHeader() {
  const { top } = useSafeAreaInsets();
  const { user , logout} = useAuth();
  const handleProfile=()=>{

  }
  const handleLogout= async()=>{
    await logout();
  }

  console.log(user); //debug

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

      <Menu>
      <MenuTrigger customStyles={{
        triggerWrapper:{

        }
      }}>
<Image
          style={{ height: hp(5), aspectRatio: 1, borderRadius: 100 }}
          source={user?.profileUrl}
          placeholder={blurhash}
          transition={500}
        />
      </MenuTrigger>
      <MenuOptions customStyles={{
        optionsContainer:{
          borderRadius: 10,
          borderCurve:"continuous",
          marginTop:40,
          marginLeft:-30,
          backgroundColor:"white",
          shadowOpacity:0.2,
          width:160,
          shadowOffset:{width:0,height:0}
        }
      }}>
       <MenuItem text="profile" action={handleProfile} value={null} icon={<Feather name="user" size={hp(2.5) } color="#737373"/>}/>
       <Divider/>
       <MenuItem text="Log out" action={handleLogout} value={null} icon={<Feather name="log-out" size={hp(2.5) } color="#737373"/>}/>
      </MenuOptions>
    </Menu>
      
      </View>
    </View>
  );
}

const Divider = ()=>{
  return(
    <View className="p-[1px] w-full bg-neutral-400"></View>
  )
}
