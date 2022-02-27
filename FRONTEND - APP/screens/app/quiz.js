import { Alert, ScrollView, StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Answer from "../../components/odgovor";
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../../redux";
import pozadina from "../../assets/pozadine/kvizBcg.png";
import slika from "../../assets/slike/pitanje.png";

function Quiz({navigation, route}) {
	const quiz = route.params.quiz;
	const level = route.params.level;
	
	const host = useSelector(state => state.host);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

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
				Alert.alert("Tacno", "Pogodili ste", [
					{
						text: "OK",
						onPress: () => navigation.goBack()
					}
				]);
			}
			else
			{
				Alert.alert("Pogrešno", "Promašili ste", [
					{
						text: "OK",
						onPress: () => navigation.goBack()
					}
				]);
			}
		}
	}
	return (
		<ImageBackground
			source={pozadina}
			resizeMode={"cover"}
			style={styles.container}
		>
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