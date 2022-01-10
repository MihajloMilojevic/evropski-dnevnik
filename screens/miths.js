import React, {useRef, useState, useEffect} from "react";
import { View, Animated, StyleSheet, PanResponder, useWindowDimensions, Button, Alert } from "react-native";
import MithCard from "../utils/mithCard";



export default function Miths({navigation})
{
	const [mith, setMith] = useState(0);
	const dimensions = useWindowDimensions();
	const translate = useRef(new Animated.Value(0)).current;
	const color = useRef(new Animated.Value(0)).current;

	const URL = "https://evropski-dnevnik-dev.herokuapp.com/api/miths"
	

	const onGuess = (guess) => {
		if(!mith) return;
		let naslov;
		if(guess === mith.correct)
			naslov = "Tačno";
		else
			naslov = "Pogrešno";
		Alert.alert(naslov, 
			`Ovaj mit je ${mith.correct ? "istinit" : "lažan"}
			${mith.description}`,[
			{
				text: "OK",
				onPress: () => navigation.goBack()
			}
		]);
		
	}
	
	const pan = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
				if(gestureState.dx > 0)
				color.setValue(1);
				else if(gestureState.dx < 0)
				color.setValue(-1);
				translate.setValue(gestureState.dx);
			},
			onPanResponderRelease: (evt, gestureState) => {
				let destination;
				if(Math.abs(gestureState.dx) <= (dimensions.width * 0.25))
					destination = 0;
				else if(gestureState.dx < 0)
					destination = -1;
				else
					destination = 1;
				Animated.timing(translate, {
					toValue: dimensions.width * destination,
					useNativeDriver: true
				}).start();
				if(destination !== 0)
					onGuess(!!(destination + 1))
			}
		})

		const [panResponder, setPanResponder] = useState(pan)

		useEffect(() => {
			setPanResponder(pan);
		  }, [mith]);

		useEffect(() => {
			(async () => {
				try {
					const res = await fetch(URL);
					const data = await res.json();
					if(data.ok)
					{	
						setMith(data.mith);
					}
					else
						throw new Error(data.message)
				} catch (error) {
					Alert.alert(error.message)
				}
			})()
		}, [])
	
	const styles = StyleSheet.create({
		container: {
			display: "flex",
			flexGrow: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "dodgerblue",
		},
		card: {
			transform: [
				{translateX: translate},
				{rotate: translate.interpolate({
					inputRange: [-dimensions.width / 2, 0, dimensions.width / 2],
					outputRange: ["-15deg", "0deg", "15deg"],
					extrapolate: "clamp"
				})}
			]
		}
	})

	if(!mith)
		return (<View></View>)
	else
		return (
		<View style={styles.container}>
			<Animated.View 
				{...panResponder.panHandlers}
				style={styles.card}
			>
				<MithCard title={mith.title}/>
			</Animated.View>
		</View>);
}