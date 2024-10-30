import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList} from "react-native";
import tw from "twrnc";
import ScreenWrapper from "../components/ScreenWrapper";
import { TouchableOpacity } from "react-native";
import randomImages from "../assets/images/randomImage";
import EmptyList from "../components/EmptyList";
import { useNavigation } from "expo-router";
import AddTripScreen from "./AddTripScreen";
import { signOut } from "firebase/auth";
import { auth, tripsRef } from "../config/firebase";
import { useSelector } from "react-redux";
import { getDocs, query, where } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

let items = [
    {
        id:1,
        place:'Chennai',
        country:'India'
    },
    {
        id:2,
        place:'Bangkok',
        country:'Thailand'
    },
    {
        id:3,
        place:'Mongolia',
        country:'Africa'
    },
    {
        id:4,
        place:'Lemuria',
        country:'India'
    }
]

function HomeScreen() {

    const navigation = useNavigation()

    const {user} = useSelector(state=>state.user);
    const [trips,setTrips] = useState([]);
    const isFocused = useIsFocused();

    async function fetchTrips(){
        const q = query(tripsRef, where("userId","==",user.uid));
        const querySnapShort = await getDocs(q)
        let data = [];
        querySnapShort.forEach(doc=>{
            console.log('document: ',doc.data());
            data.push({...doc.data(), id:doc.id})
        })
        setTrips(data);

    }

    useEffect(()=>{
        if(isFocused){
            fetchTrips();
        }
    },[isFocused])

    async function handleLogout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
  return (
    <ScreenWrapper style={tw`flex-1`}>
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text style={tw`font-bold text-gray-600 text-3xl shadow-sm`}>
          Roam & Record
        </Text>
        <TouchableOpacity
          style={tw`p-2 px-3 bg-white border border-gray-200 rounded-full`}
          onPress={handleLogout}
        >
          <Text style={tw`text-gray-600`}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View
        style={tw`flex-row justify-center items-center bg-blue-100 rounded-xl mx-4 mb-4`}
      >
        <Image
          source={require("../assets/images/banner.png")}
          style={tw`w-60 h-60`}
        />
      </View>

      <View>
        <View style={tw`flex-row justify-between items-center p-4`}>
          <Text style={tw`font-bold text-gray-600 text-2xl shadow-sm`}>
            Recent Trips
          </Text>
          <TouchableOpacity
            style={tw`p-2 px-3 bg-white border border-gray-200 rounded-full`}
            onPress={()=>navigation.navigate('AddTrip')}
          >
            <Text style={tw`text-gray-600`}>Add Trip</Text>
          </TouchableOpacity>
        </View>

        <View style={{height:320}}>
            <FlatList
                style={tw`mx-2`}
                data={trips}
                ListEmptyComponent={<EmptyList message="You have not recorded any trips.."/>}
                numColumns={2}
                keyExtractor={item=>item.id}
                columnWrapperStyle={{
                    justifyContent:'space-between'
                }}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity  onPress={()=>navigation.navigate('TripExpenses', {...item})}  style={tw`bg-white p-3 rounded-2xl mb-3 shadow-sm`}>
                            <View>
                                <Image
                                    source={randomImages()}
                                    style={tw`w-36 h-36 mb-2`}
                                />
                                <Text style={tw`text-gray-600 font-bold`}>{item.place}</Text>
                                <Text style={tw`text-gray-600 text-xs`}>{item.country}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default HomeScreen;
