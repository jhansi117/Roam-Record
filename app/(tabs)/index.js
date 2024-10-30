import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigation from '../../navigation/AppNavigation'
import { store } from '../../redux/store';
import { Provider } from 'react-redux'

export default function index() {
  return (
    <Provider store={store}>
      <AppNavigation/>
    </Provider>
  )
}

