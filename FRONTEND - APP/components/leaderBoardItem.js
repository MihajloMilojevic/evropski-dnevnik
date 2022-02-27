import { StyleSheet, Text, View } from "react-native"
import {Grid, Col, Row} from "react-native-easy-grid"


export default function LeaderbeardItem({user, rank}) {
	return (
		<View  style={styles.itemContainer}>
			<Text style={[styles.rank, styles.text, styles.rankTekst]}>{rank}</Text>
			<Text style={[styles.name, styles.text]}>{user.username}</Text>
			<Text style={[styles.points, styles.text, styles.pointsTekst]}>{user.points}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	itemContainer: {
		display: "flex",
		flexDirection: "row",
		minHeight: 75,
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 5,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: "#EBEBEB",
	},
	text: {
		alignSelf: "center",
		textAlign: "center",
		fontSize: 16
	},
	rank: {
		flex: 1,
	},
	name: {
		flex: 2,
		fontWeight: "bold"
	},
	points: {
		flex: 1,
		fontWeight: "bold"
	},
	rankTekst: {
		fontSize: 24,
		fontWeight: "bold"
	},
	pointsTekst: {
		textDecorationLine: "underline"
	}
})