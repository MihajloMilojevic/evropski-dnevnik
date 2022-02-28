import { StyleSheet, Text, View } from "react-native"
import {Grid, Col, Row} from "react-native-easy-grid"


export default function LeaderbeardItem({user, rank}) {
	if(rank <= 3)
	return (
		<>
			<View  style={[styles.itemContainer, (rank <= 3 ? {backgroundColor:"#3268B8"} : {})]}>
				<Text style={[styles.rank, styles.text, styles.rankTekst, {color: "#fff"}]}>{rank}</Text>
				<Text style={[styles.name, styles.text, {color: "#fff"}]}>{user.username}</Text>
				<Text style={[styles.points, styles.text, styles.pointsTekst, {color: "#fff"}]}>{user.points}</Text>
			</View>
			<View style={styles.hairline} />
		</>
	)
	return (
		<>
			<View  style={[styles.itemContainer]}>
				<Text style={[styles.rank, styles.text, styles.rankTekst]}>{rank}</Text>
				<Text style={[styles.name, styles.text]}>{user.username}</Text>
				<Text style={[styles.points, styles.text, styles.pointsTekst]}>{user.points}</Text>
				
			</View>
			<View style={styles.hairline} />
		</>
	)
}

const styles = StyleSheet.create({
	hairline: {
        // backgroundColor: '#3268B8', // plava
        backgroundColor: '#AF9E00', //zlatna
        height: 2,
        width: "100%",
		// marginVertical: 1
      },
	itemContainer: {
		display: "flex",
		flexDirection: "row",
		minHeight: 75,
		justifyContent: "center",
		//borderWidth: 1,
		//borderRadius: 5,
		//marginLeft: 10,
		//marginRight: 10,
		//marginTop: 5,
		//marginBottom: 5,
		backgroundColor: "#f8f9fa",
		marginVertical: -1,
		width: "100%"
	},
	text: {
		alignSelf: "center",
		textAlign: "center",
		fontSize: 16,
		color: "#000"
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
		//textDecorationLine: "underline"
	}
})