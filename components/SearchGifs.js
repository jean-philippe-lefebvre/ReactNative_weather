import React, { useState } from 'react'
import { View, TextInput, StyleSheet, FlatList, Image } from 'react-native'

export function SearchGifs (){
	const [gifs, setGifs] = useState([]);

	async function fetchGifs(text){
		if(text === '') {
			setGifs([])
			return null
		}
		const API_KEY = 'iKL79DhzQAV4UvwgGNF11O5B4Wk86RGO'
		const BASE_URL = 'http://api.giphy.com/v1/gifs/search'
		const URI = BASE_URL+'?api_key='+API_KEY+'&q='+text

		try{
			const resJson = await fetch(URI)
			const res = await resJson.json()
			setGifs(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	return <View style={styles.view}>
			<View style={styles.image}>
			{ gifs && gifs.length > 0 ? <Image
				resizeMode='contain'
				style={styles.image}
				source={{uri: gifs[0].images.original.url}}/> 
				: null 
			}
			</View>
		      <TextInput
		        placeholder="Search Giphy"
		        style={styles.textInput}
		        onChangeText={(text) => {
					debounce(() => fetchGifs(text), 300)
				}}
		      />

		    </View>
}

const styles = StyleSheet.create({
	  view: {
		  flex: 1,
		  alignItems: 'center',
		  justifyContent: 'center',
		  padding: 10,
		},
	  textInput: {
		  color: 'black',
		  height: 30,
		  width: '50%',
		  paddingHorizontal: 5,
		  borderWidth: 1,
		  borderRadius: 5,
		    },
	  image: {
		  width: 600,
		  height: 300,
		  marginBottom: 20
		},
})

let timer
function debounce( callback, delay ){
	return function(){
		clearTimeout(timer)
		let args = arguments
		let context = this

		timer = setTimeout(function(){
			callback.apply(context, args)
		}, delay)
	}()
}

