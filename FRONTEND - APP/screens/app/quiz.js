import { Alert, ScrollView, StyleSheet, Text, View, ImageBackground } from "react-native";
import Answer from "../../components/odgovor";
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../../redux";
import pozadina from "../../assets/pozadine/kvizBcg.png";

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
									paddingLeft: 50,
									paddingRight: 50,
									paddingTop: 5,
									paddingBottom: 5,
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
		flex: 2,
		justifyContent: "center",
		alignItems: "center"
	},
	pitanjeText: {
		fontSize: 30,
		textAlign: "center"
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
	}
})

export default Quiz;