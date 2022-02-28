import React, {useRef, useState, useEffect} from "react";
import { View, Animated, StyleSheet, PanResponder, useWindowDimensions, Button, Alert, Text, ImageBackground, Image } from "react-native";
import MithCard from "../../components/mithCard";
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../../redux";
import pozadina from "../../assets/pozadine/mithsBcg.png";
import VictoryModal from "../../components/victoryModal";
import LoadingModal from "../../components/loadingModal";
import MessageModal from "../../components/messageModal";
import LoseModal from "../../components/looseModal";
import mithSwipe from "../../assets/slike/mithsSwipe.png"

export default function Miths({navigation, route})
{
	const [mith, setMith] = useState(route.params.mith);
	const level = route.params.level;
	const [loading, setLoading] = useState(false)
	const [victoryModal, setVictoryModal] = useState({
		show: false,
		title: "",
		messages: [],
		scrollMessage: "",
		onPress: () => {}
	})
	const [loseModal, setloseModal] = useState({
		show: false,
		title: "",
		messages: [],
		scrollMessage: "",
		onPress: () => {}
	})
	const [messageModal, setMessageModal] = useState({
		show: false,
		title: "",
		message: "",
		scrollMessage: "",
		onPress: () => {}
	})

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
			(async () => {
                try {
					setLoading(true)
                	const res = await fetch(host + "/api/users/level/pass/" + level, {
						headers: {
						"Authorization": "Bearer " + user.token
						}
					})
					const json = await res.json();
					setLoading(false)
					if(json.ok) 
					{
						dispatch(setUser({...json.user, token: json.token}));
						setVictoryModal({
							title: "BRAVO",
							messages: [
								`Broj osvojenih poena: ${json.points}`,
								`Ovo ${mith.correct ? "jeste" : "nije"} mit`
							],
							scrollMessage: mith.description,
							show: true,
							onPress: () => navigation.goBack()
						})
					}
					else {
						setMessageModal({
							title: "Greška",
							message: json.message,
							show: true,
							onPress: () => navigation.goBack()
						})
					}
                } catch (error) {
					setLoading(false)
					setMessageModal({
						title: "Greška",
						message: "Došlo je do greške",
						show: true,
						onPress: () => navigation.goBack()
					})
                }
              })()
		}
		else
			setloseModal({
				title: "POGREŠNO",
				messages: [
					`Ovo ${mith.correct ? "jeste" : "nije"} mit`
				],
				scrollMessage: mith.description,
				show: true,
				onPress: () => navigation.goBack()
			})
		
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
			//backgroundColor: "dodgerblue",
		},
		swipe: {
			width: 200,
			height: 150,
			position: "absolute",
			bottom: -25,
			zIndex: 2,
		},
		card: {
			/*shadowRadius: translate.interpolate({
				inputRange: [-dimensions.width / 2, 0, dimensions.width / 2],
				outputRange: [100, 0, 100],
				extrapolate: "clamp"
			}),*/

			zIndex: 1,
			backgroundColor: translate.interpolate({
				inputRange: [-dimensions.width / 2, 0, dimensions.width / 2],
				outputRange: ["#41f26e", "white", "#ff5b4f"],
				extrapolate: "clamp"
			}),
			borderRadius: 20,
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
		return (<View><Text>Error</Text></View>)
	else
		return (
		<ImageBackground style={styles.container} source={pozadina} resizeMode={"cover"}>
			
			<Image 
					source={mithSwipe}
					style={styles.swipe}
					resizeMode={"contain"}
			/>
			<MessageModal 
				title={messageModal.title} 
				message={messageModal.message} 
				showModal={messageModal.show} 
				onPress={messageModal.onPress}
			/>
			<VictoryModal 
				title={victoryModal.title} 
				messages={victoryModal.messages} 
				showModal={victoryModal.show} 
				onPress={victoryModal.onPress}
				scrollMessage={victoryModal.scrollMessage}
			/>
			<LoseModal 
				title={loseModal.title} 
				messages={loseModal.messages} 
				showModal={loseModal.show} 
				onPress={loseModal.onPress}
				scrollMessage={loseModal.scrollMessage}
			/>
			<LoadingModal showModal={loading}/>
			<Animated.View 
				{...panResponder.panHandlers}
				style={styles.card}
			>
				<MithCard title={mith.title}/>
			</Animated.View>
			
		</ImageBackground>);
}