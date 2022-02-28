import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Answer from "../../components/odgovor";
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../../redux";
import pozadina from "../../assets/pozadine/kvizBcg.png";
import slika from "../../assets/slike/pitanje.png";
import VictoryModal from "../../components/victoryModal";
import LoadingModal from "../../components/loadingModal";
import MessageModal from "../../components/messageModal";
import LoseModal from "../../components/looseModal";

function Quiz({navigation, route}) {
	const quiz = route.params.quiz;
	const level = route.params.level;
	
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
		<ImageBackground
			source={pozadina}
			resizeMode={"cover"}
			style={styles.container}
		>
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
			<Image
				source={slika}
				style={styles.slika}
			/>
			<ScrollView contentContainerStyle={styles.container}>
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
		</ImageBackground>
		
	)
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	pitanjeContainer: {
		//display: "flex",
		//flex: 2,
		justifyContent: "center",
		alignItems: "center",
		width: "95%"
	},
	pitanjeText: {
		fontSize: 30,
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
		padding: 20
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
	slika: {
		marginTop: 40,
		width: 200,
		height: 200,
	}
})

export default Quiz;