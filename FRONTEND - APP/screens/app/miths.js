import React, {useRef, useState, useEffect} from "react";
import { View, Animated, StyleSheet, PanResponder, useWindowDimensions, Button, Alert, Text, ImageBackground } from "react-native";
import MithCard from "../../components/mithCard";
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../../redux";
import pozadina from "../../assets/pozadine/mithsBcg.png";

export default function Miths({navigation, route})
{
	const [mith, setMith] = useState(route.params.mith);
	const level = route.params.level;

	const host = useSelector(state => state.host);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const dimensions = useWindowDimensions();
	const translate = useRef(new Animated.Value(0)).current;	

	const onGuess = async (guess) => {
		if(!mith) return;
		let naslov;
		if(guess === mith.correct)
		{
			naslov = "Tačno";
			(async () => {
                try {
                  const res = await fetch(host + "/api/users/level/pass/" + level, {
                    headers: {
                      "Authorization": "Bearer " + user.token
                    }
                  })
                  const json = await res.json();
                  if(json.ok) 
                    dispatch(setUser({...json.user, token: json.token}));
                } catch (error) {
                  
                }
              })()
		}
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
					useNativeDriver: false
				}).start();
				if(destination !== 0)
					onGuess(!!(destination + 1))
			}
		})

		const [panResponder, setPanResponder] = useState(pan)

		useEffect(() => {
			setPanResponder(pan);
		  }, [mith]);
	
	const styles = StyleSheet.create({
		container: {
			display: "flex",
			flexGrow: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "dodgerblue",
		},
		card: {
			/*shadowRadius: translate.interpolate({
				inputRange: [-dimensions.width / 2, 0, dimensions.width / 2],
				outputRange: [100, 0, 100],
				extrapolate: "clamp"
			}),*/
			backgroundColor: translate.interpolate({
				inputRange: [-dimensions.width / 2, 0, dimensions.width / 2],
				outputRange: ["red", "white", "green"],
				extrapolate: "clamp"
			}),
			borderRadius: 20,
			transform: [
				{translateX: translate},
				// {rotate: translate.interpolate({
				// 	inputRange: [-dimensions.width / 2, 0, dimensions.width / 2],
				// 	outputRange: ["-15deg", "0deg", "15deg"],
				// 	extrapolate: "clamp"
				// })}
			]
		}
	})

	if(!mith)
		return (<View><Text>Error</Text></View>)
	else
		return (
		<ImageBackground style={styles.container} source={pozadina} resizeMode={"cover"}>
			<Animated.View 
				{...panResponder.panHandlers}
				style={styles.card}
			>
				<MithCard title={mith.title}/>
			</Animated.View>
		</ImageBackground>);
}