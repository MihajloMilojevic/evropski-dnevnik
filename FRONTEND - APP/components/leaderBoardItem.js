import { StyleSheet, Text, View } from "react-native"
import {Grid, Col, Row} from "react-native-easy-grid"


export default function LeaderbeardItem({user, rank}) {
	return (
		<View  style={styles.itemContainer}>
			<Text style={[styles.rank, styles.text]}>{rank}</Text>
			<Text style={[styles.name, styles.text]}>{user.username}</Text>
			<Text style={[styles.points, styles.text]}>{user.points}</Text>
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
		borderRadius: 20,
		margin: 10 
	},
	text: {
		alignSelf: "center",
		textAlign: "center",
		fontSize: 20
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
	}
})