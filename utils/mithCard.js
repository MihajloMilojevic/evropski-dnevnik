import React from "react";
import { StyleSheet, View, Text, Dimensions  } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MithCard() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>NASLOV</Text>
			<Text style={styles.text}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. 
				Necessitatibus dolore fugit odio, explicabo voluptatibus 
				numquam incidunt deleniti temporibus facere earum 
				consectetur repellat fuga laboriosam sint dolores. 
				Quibusdam illo sunt numquam.
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: windowWidth * (3 / 4),
		height: windowHeight / 2,
		justifyContent: "center",
		textAlign: "center",
		backgroundColor: "white",
		borderRadius: 20,
	},
	text: {
		textAlign: "center",
		margin: 10
	}
})