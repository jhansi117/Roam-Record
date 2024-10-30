import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import ScreenWrapper from '../components/ScreenWrapper';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

export default function WelcomeScreen() {

  const naviagtion = useNavigation();

  return (
    <ScreenWrapper>
      <View style={tw`flex h-full justify-around`}>
        <View style={tw`flex-row justify-center mt-10`}>
          <Image source={require('../assets/images/welcome.png')} style={tw`h-76 w-76 shadow`}/>
        </View>
        <View style={tw`mx-5 mb-20`}>
          <Text style={tw`font-bold text-gray-600 text-4xl shadow-sm text-center mb-6`}>Roam & Record</Text>
          <TouchableOpacity  onPress={()=>naviagtion.navigate('SignIn')}   style={tw`rounded-full p-3 shadow-sm bg-yellow-500 mb-5`}>
            <Text style={tw`text-center text-white text-lg font-bold`}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>naviagtion.navigate('SignUp')} style={tw`rounded-full p-3 shadow-sm bg-yellow-500`}>
            <Text style={tw`text-center text-white text-lg font-bold`}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  )
}

