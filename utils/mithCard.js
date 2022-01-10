import React from "react";
import { StyleSheet, View, Text, Dimensions  } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MithCard({title}) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{title}</Text>
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
		color: "dodgerblue",
		fontSize: 30
	}
})