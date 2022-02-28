import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable, ImageBackground, Image} from "react-native";
import { removeUser } from "../../redux";
import {useSelector, useDispatch} from "react-redux";
import CustomButton from "../../components/customButton";
import pozadina from "../../assets/pozadine/homepageBcg.png";
import gornjaSlika from "../../assets/slike/logo1.png";

export default function Home({navigation})
{
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	{/*const logoutButton = async () => {
		dispatch(removeUser())
		Alert.alert("Uspeh", "Uspešno odjavljen")
		navigation.replace("login")
	}*/}

	return (
		<ImageBackground source={pozadina} resizeMode={"cover"} style={styles.container}>
			<Image
				style={styles.slika}
				source={gornjaSlika}
			></Image>
			<Text style={styles.zdravo}>Zdravo, {user.username}</Text>
			
			<CustomButton
				title={"Uputstvo"}
				onPress={() => navigation.navigate("uputstvo")}
				containerStyle={styles.dugme}
				textStyle={styles.dugmeTekst}
			/>
			<CustomButton
				title={"O aplikaciji"}
				onPress={() => navigation.navigate("o_aplikaciji")}
				containerStyle={styles.dugme2}
				textStyle={styles.dugme2Tekst}
			/>
			{/*<CustomButton
				title={"Izloguj se"}
				onPress={logoutButton}
			/>
			<CustomButton
				title={"Biblioteka"}
				onPress={() => navigation.navigate("biblioteka")}
			/>*/}
		</ImageBackground>
	);
}
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	zdravo: {
		color: "#000",
		textAlign: "center",
		fontSize: 30,
		fontWeight: "bold",
		marginVertical: 30
	},
	slika: {
		width: 200,
		height: 200,
	},
	tekst: {
		color: "#000",
		textAlign: "center",
		padding: 30,
		fontSize: 30,
	},
	dugme2: {
		width: 200,
		borderWidth: 2,
		borderColor: "#3268B8",
		backgroundColor: "#EBEBEB"
	},
	dugme2Tekst: {
		textAlign: "center",
		color: "#3268B8"
	},
	
	dugme: {
		alignSelf: "center",
		width: 200
	},
	dugmeTekst: {
		textAlign: "center"
	},
})