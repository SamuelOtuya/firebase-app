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
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "../../firebaseConfig";

export default function home() {
  const { user,logout } = useAuth();
  const [users,setUsers]=useState([ ]);
  useEffect(()=>
    {if(user?.uid)getUsers();}
)

  const getUsers=async()=>{
    //fetch users
    const q = query(usersRef,where('userId','!=',user?.uid));

    const querySnapshot = await getDocs(q);
    
    let data=[];
    querySnapshot.forEach(doc=>{data.push({...doc.data()});
  });
try{
    console.log('got users:',data);
    setUsers(data);}

    catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  console.log("userdata:", user);

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
