import { useState } from "react";
import { Alert, StyleSheet, Text, View, ScrollView, Image } from "react-native";
import Answer from "../../components/odgovor";
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../../redux";
import slika from "../../assets/slike/pitanje.png";
import VictoryModal from "../../components/victoryModal";
import LoadingModal from "../../components/loadingModal";
import MessageModal from "../../components/messageModal";
import LoseModal from "../../components/looseModal";

function ImageQuiz({navigation, route}) {
	
	const host = useSelector(state => state.host);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

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
		scrollMessage: null,
		onPress: () => {}
	})

	const quiz = route.params.image;
	const level = route.params.level;
	const answer = (index) => {
		return () => {
			if(index === quiz.correct)
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
									`Tačan odgovor je: ${quiz.answers[quiz.correct]}`
								],
								show: true,
								onPress: () => navigation.goBack()
							})
						}
						else
							setMessageModal({
								title: "Greška",
								message: json.message,
								show: true,
								onPress: () => navigation.goBack()
							})
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
			{
				setloseModal({
					title: "POGREŠNO",
					messages: [
						`Tačan odgovor je: ${quiz.answers[quiz.correct]}`
					],
					show: true,
					onPress: () => navigation.goBack()
				})
			}
		}
	}
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Image
				source={slika}
				style={styles.slika1}
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
			<View style={styles.slikaContainer}>
				<Image
					source={{uri: host + quiz.image}}
					resizeMode={"contain"}
					style={styles.slika}
				/>
			</View>
			<View style={styles.pitanjeContainer}>
				<Text style={styles.pitanjeText}>{quiz.question}</Text>
			</View>
			
			<View style={styles.odgovoriContainer}>
				{
					quiz.answers.map((item, index) => (
						<Answer
							key={index}
							text={item} 
							textStyle={styles.odgovoriText}
							style={{
								borderRadius: 5,
								margin: 5,
								paddingLeft: 2,
								paddingRight: 2,
								paddingTop: 2,
								paddingBottom: 2,
								width: 300,
								shadowColor: 'rgba(0,0,0,0.5)',
								shadowOffset: {
									width: 1,
									height: 1,
								},
								shadowOpacity: 0.5,
								elevation: 2,
							}}
							onPress={answer(index)}
						/>))
				}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		//flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	pitanjeContainer: {
		//display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "90%"
	},
	pitanjeText: {
		fontSize: 24,
		textAlign: "center",
		backgroundColor: "#FBFBFB",
		borderRadius: 5,
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {
			width: 1,
			height: 1,
		},
		shadowOpacity: 0.5,
		elevation: 10,
		padding: 20,
		marginTop: 10,
		marginBottom: 10
	},
	slikaContainer: {
		//flex: 2,
		//justifyContent: "center",
		//alignItems: "center",
		//margin: 0
	},
	slika: {
		width: 300,
		height: 200,
		borderRadius: 5
	},
	odgovoriContainer: {
		//display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "90%"
	},
	odgovoriText: {
		textAlign: "center",
		padding: 20,
		backgroundColor: "#FBFBFB",
		margin: 0
	},
	slika1: {
		width: 200,
		height: 200
	}
})

export default ImageQuiz;