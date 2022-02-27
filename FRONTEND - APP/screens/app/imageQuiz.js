import { Alert, StyleSheet, Text, View, ScrollView, Image } from "react-native";
import Answer from "../../components/odgovor";
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../../redux";
import slika from "../../assets/slike/pitanje.png";

function ImageQuiz({navigation, route}) {
	
	const host = useSelector(state => state.host);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const quiz = route.params.image;
	const level = route.params.level;
	const answer = (index) => {
		return () => {
			if(index === quiz.correct)
			{
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
				Alert.alert("Tacno", "Pogodili ste", [{
						text: "OK",
						onPress: () => navigation.goBack()
					}]);
			}
			else
				Alert.alert("Pogrešno", "Promašili ste", [
					{
						text: "OK",
						onPress: () => navigation.goBack()
					}
				]);
		}
	}
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Image
				source={slika}
				style={styles.slika1}
			/>
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
		alignItems: "center"
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