import { Text, View, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert  } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import ScreenWrapper from "../components/ScreenWrapper";
import BackButton from "../components/BackButton";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { addDoc } from "firebase/firestore";
import { tripsRef } from "../config/firebase";
import { useSelector } from "react-redux";

export default function AddTripScreen() {
  const navigation = useNavigation();
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');

  const {user} = useSelector(state=>state.user);

  async function handleAddTrip() {
    if (place && country) {
      // navigation.navigate('Home');
      let doc = await addDoc(tripsRef,{
        place,
        country,
        userId:user.uid
      })
      if(doc && doc.id){
        navigation.goBack();
      }
    } else {
      Alert.alert("Nope!", "Place and Country are required");
    }
  }

  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={tw`flex-grow`} keyboardShouldPersistTaps="handled">
          <View style={tw`flex justify-between h-full mx-4`}>
            <View>
              <View style={tw`relative mt-2`}>
                <View>
                  <BackButton style={tw`absolute top-0 left-0`} />
                </View>
                <Text style={tw`font-bold text-gray-600 text-xl shadow-sm text-center`}>
                  Add Trip
                </Text>
                <View style={tw`flex-row justify-center mb-3`}>
                  <Image
                    source={require("../assets/images/4.png")}
                    style={tw`h-72 w-72`}
                  />
                </View>
                <View style={tw`my-2 mx-2`}>
                  <Text style={tw`font-bold text-gray-600 text-lg shadow-sm`}>
                    Where on Earth?
                  </Text>
                  <TextInput
                    value={place}
                    onChangeText={(value) => setPlace(value)}
                    style={tw`p-3 bg-white rounded-full mb-3`}
                  />
                  <Text style={tw`font-bold text-gray-600 text-lg shadow-sm`}>
                    Which Country
                  </Text>
                  <TextInput
                    value={country}
                    onChangeText={(value) => setCountry(value)}
                    style={tw`p-3 bg-white rounded-full mb-3`}
                  />
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={tw`my-6 rounded-full p-3 shadow-sm bg-yellow-500`}
                onPress={handleAddTrip}
              >
                <Text style={tw`text-center text-white text-lg font-bold`}>
                  Add Trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}
