import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

export default function ScreenWrapper({children}) {
  return (
    <View style={tw`mt-3`}>
      {
        children
      }
    </View>
  )
}

const styles = StyleSheet.create({})