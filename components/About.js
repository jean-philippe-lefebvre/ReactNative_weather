import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Lorem } from './Lorem'

export function About() {
	return <View style={style.container}>
		<Text style={style.title}>About</Text>
		<Lorem style={style.defaultText}/>
		</View>
}


const style = StyleSheet.create({
	container: {
		margin: 50,
		flex: 1,
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		margin: 20,
		marginBottom: 50
	},
	defaultText: {
		fontSize: 14,
	}
})

