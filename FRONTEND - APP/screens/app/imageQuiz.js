import { Alert, StyleSheet, Text, View, ScrollView, Image } from "react-native";
import Answer from "../../components/odgovor";

function ImageQuiz({navigation, route}) {
	const quiz = route.params;
	const answer = (index) => {
		return () => {
			if(index === quiz.correct)
			{
				Alert.alert("Tacno", "Pogodili ste");
				navigation.goBack();
			}
			else
			{
				Alert.alert("Pogrešno", "Promašili ste");
				navigation.goBack();
			}
		}
	}
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.pitanjeContainer}>
				<Text style={styles.pitanjeText}>{quiz.question}</Text>
			</View>
			<View style={styles.slikaContainer}>
				<Image
					source={{uri: quiz.image}}
					resizeMode={"contain"}
					style={styles.slika}
				/>
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
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	pitanjeText: {
		fontSize: 30,
		textAlign: "center"
	},
	slikaContainer: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center"
	},
	slika: {
		width: 300,
		height: 200
	},
	odgovoriContainer: {
		//display: "flex",
		flex: 2,
		justifyContent: "center",
		alignItems: "center",
	},
	odgovoriText: {
		textAlign: "center"
	}
})

export default ImageQuiz;