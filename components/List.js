import React, { useState } from 'react'
import { View, Animated,
	StyleSheet, Pressable, 
	FlatList, Text, Image,
	ActivityIndicator } from 'react-native'
import { ViewListAnimated } from './ViewListAnimated'

const API_KEY = 'dc2cf6459610ace08cc06664d0c6ec17'
const API_URI = `https://api.openweathermap.org/data/2.5/forecast/daily`

async function getWeather(city, setState){
	const request = `?q=${city}&cnt=7&appid=${API_KEY}&units=metric&lang=fr`
	const finalURI = API_URI + request
	const iconURI = 'http://openweathermap.org/img/wn/'
	let weatherList

	try {
		const result = await fetch(finalURI)
		const responseData = await result.json()

		weatherList = responseData.list.map((day, i) => {
			const date = new Date(day.dt*1000)
			return { 
				date: date,
				id: i,
				temp: day.temp,
				humidity: day.humidity,
				pop: day.pop,
				weather: day.weather[0].description,
				weatherIcon: iconURI + day.weather[0].icon + '.png'
			}
		})

		setState({city: city, report: weatherList})
	} catch(error) {
		console.log(error)
	}
}

export function List({ route: {params: { city } } }){
	const [state, setState] = useState({city: city, report: null})
	let content = []

	if(state.report === null){
		getWeather(city, setState)
		content = <ActivityIndicator style={{margin:20}} color={'blue'} size='large' />
	} else {
		content = <View style={styles.container}>
				<FlatList 
					data={state.report}
					renderItem={renderItem}
					keyExtractor={item => item.id.toString()}
				/>
			</View>
	}

	return content
}

function renderItem({item}) {
	const date = item.date
	const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
	const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
	const dayName = days[date.getDay()]
	const monthName = month[date.getMonth()]
	const select = item.id === 0 ? 'selected' : undefined

	return <ViewListAnimated delay={item.id * 100} >
			<View style={[ styles.containerMeteo, styles[select] ]}>

			<View style={styles.title}>
				<Text style={[styles.titleJour, styles.bold]}>{dayName}</Text>
				<Text style={styles.titleJour}> {date.getDate()}</Text>
				<Text style={styles.titleJour}> {monthName}</Text>
				<Text style={styles.titleJour}> {date.getFullYear()}</Text>
			</View>

			<View style={styles.meteo} >
				<Text style={styles.description}>{item.weather}</Text>
				<Image source={{uri: item.weatherIcon}} style={styles.img} />
			</View>

			<View style={styles.data}>
				<Text>Température: 
					min <Text style={styles.bold}>{item.temp.min}</Text>°C - 
					max <Text style={styles.bold}>{item.temp.max}</Text>°C
				</Text>
				<Text>Humidité: 
					<Text style={styles.bold}> {item.humidity}%</Text>
				</Text>
				<Text>Précipitations: 	
					<Text style={styles.bold}> {item.pop * 100}%</Text>
				</Text>
			</View>

		</View>
		</ViewListAnimated>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	selected: {
		backgroundColor: '#FFB46A',
	},
	containerMeteo: {
		flex: 1,
		alignItems: 'stretch',
		backgroundColor: '#C1E5FF',
		borderColor: 'black',
		borderWidth: 1,
		padding: 20,
	},
	img: {
		height: 40,
		width: 40,
	},
	title: {
		flex: 1,
		flexDirection: 'row',
	},
	titleJour: {
		fontSize: 20,
	},
	bold: {
		fontWeight: 'bold',
	},
	meteo: {
		flex:1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	description: {
		textTransform: 'capitalize',
		fontSize: 17,
	},
	data: {
	},
})
