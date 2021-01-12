import React, { useRef, useEffect } from 'react'
import { StyleSheet, Animated, Dimensions } from 'react-native'

export function ViewListAnimated({ children, delay}) {
	const widthWindow = Dimensions.get('window').width
	const pan = useRef(new Animated.ValueXY({x: widthWindow, y: 0})).current
	useEffect( () => {
		Animated.spring(pan, {
			toValue: { x: 0, y: 0 },
			delay: delay,
			useNativeDriver: true
		}).start()
	}, [])

	return <Animated.View style={{
				transform: pan.getTranslateTransform()
			}}>
			{ children }
		</Animated.View>
}
