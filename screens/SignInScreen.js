import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import BackButton from "../components/BackButton";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";

export default function SignInScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    if (email && password) {
      // navigation.navigate('Home');
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        Alert.alert("Error", e.message);
      }
    } else {
      Alert.alert("Nope!", "Email and Password are required");
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={tw`flex-grow`}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`flex justify-between h-full mx-4`}>
          <View>
            <View style={tw`relative mt-2`}>
              <View>
                <BackButton style={tw`absolute top-0 left-0`} />
              </View>
              <Text
                style={tw`font-bold text-gray-600 text-xl shadow-sm text-center`}
              >
                Sign In
              </Text>
              <View style={tw`flex-row justify-center mb-3`}>
                <Image
                  source={require("../assets/images/login.png")}
                  style={tw`h-72 w-72`}
                />
              </View>
              <View style={tw`my-2 mx-2`}>
                <Text style={tw`font-bold text-gray-600 text-lg shadow-sm`}>
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  style={tw`p-3 bg-white rounded-full mb-3`}
                />
                <Text style={tw`font-bold text-gray-600 text-lg shadow-sm`}>
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  style={tw`p-3 bg-white rounded-full mb-3`}
                  secureTextEntry
                />
                <TouchableOpacity>
                  <Text style={tw`font-bold`}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={tw`my-6 rounded-full p-3 shadow-sm bg-yellow-500`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-center text-white text-lg font-bold`}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
