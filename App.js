import React, { useState } from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { About } from './components/About'
import { SearchGifs } from './components/SearchGifs'
import Search from './components/Search.js'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
	  <NavigationContainer>
		<StatusBar hidden={false} />
	  	<MyTabs />
	  </NavigationContainer>
  );
}

function MyTabs(){
	return (
	  <Tab.Navigator initialRouteName="Search" >
		<Tab.Screen name="Search" component={ Search } />
		<Tab.Screen name="SearchGifs" component={ SearchGifs } />
		<Tab.Screen name="About" component={ About } />
	  </Tab.Navigator>
	)
}
