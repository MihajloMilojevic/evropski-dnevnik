import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Answer from "../../components/odgovor";
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../../redux";

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
								borderWidth: 1,
								borderRadius: 20,
								margin: 5,
								paddingLeft: 50,
								paddingRight: 50,
								paddingTop: 5,
								paddingBottom: 5,
								width: 300
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
		textAlign: "center"
	}
})

export default Quiz;