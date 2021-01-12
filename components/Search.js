import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { List } from './List'

const Stack = createStackNavigator();

export default function MyStack(){
	return (
		<Stack.Navigator>
			<Stack.Screen name="Rechercher une ville" component={Search} />
			<Stack.Screen name="List" component={List} />
		</Stack.Navigator>
	)
}

function Search({ navigation }){
	const [city, setCity] = useState('Bastia')
	const submit = (city) => {
		navigation.navigate('List', {city: city})
	}
	
	return <View style={styles.container}>
		  <TextInput
			placeholder="Ville"
			style={styles.textInput}
			value={city}
			onChangeText={(text) => setCity(text)}
			onSubmitEditing={() => submit(city)}
		  />
			<Pressable style={styles.btn} onPress={() => submit(city)}>
				<Text style={styles.btnText} >RECHERCHER</Text>
			</Pressable>
		</View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	btn: {
		marginTop: 10,
		backgroundColor: '#6B6DFC',
		padding: 5,
		borderRadius: 2,
	},
	btnText: {
		color: '#FFF'
	},
	textInput: {
		color: 'black',
		height: 30,
		width: '50%',
		marginTop: 20,
		paddingLeft: 3,
		borderWidth: 1,
		borderRadius: 2,
	},
})
