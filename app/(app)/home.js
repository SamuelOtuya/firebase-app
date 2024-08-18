import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useAuth } from "../../context/authContext";
import { StatusBar } from "expo-status-bar";
import Chatlist from "../../components/Chatlist";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function home() {
  const { user,logout } = useAuth();
  const [users,setUsers]=useState([1,2,3]);
  useEffect(()=>
    {if(user?.uid)getUsers();}
)

  const getUsers=async()=>{
    //fetch users
  }

  //console.log("userdata:", user);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light"/>
      {
        users.length>0?(
          <Chatlist users={users}/>
        ):(      
        <View className="flex items-center" style={{top:hp(30)}}>
        <ActivityIndicator size="larger"/>
                </View>
                )
    
      }
    
    </View>
  );
}
