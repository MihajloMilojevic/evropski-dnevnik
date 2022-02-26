import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable, ImageBackground, Image} from "react-native";
import CollapseUputstvo from "../components/collapseUputstvo";
import {useSelector, useDispatch} from "react-redux";
import CustomButton from "../components/customButton";
import pozadina from "../assets/pozadine/loadBcg.png";

export default function Uputstvo({navigation})
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
			<Text style={styles.naslov}>UPUTSTVO</Text>
			<Text style={styles.tekst}>Kliknite na naslov u delu koji vas zanima da bi videli kako se koristi aplikacija</Text>
			<CollapseUputstvo
				title={"Naslov"}
				tekst={"Ovde ce da bude neki tekst koji objasnjava kako ce da se koristi nesto sto je opisano u naslovu. Ovo je struktura koju kasnije menjamo"}
			/>
			<CustomButton 
				title={"Nazad"} 
				onPress={() => {navigation.goBack()}}
				containerStyle={styles.dugme}
			/>
		</ImageBackground>
	);
}
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: "center",
	  justifyContent: 'center',
	},
	dugme: {
		alignSelf: "center",
	},
	naslov: {
		fontSize: 24,
		fontWeight: "bold",
		alignSelf: "center"
	},
	tekst: {
		textAlign: "center",
		paddingLeft: 40,
		paddingRight: 40,
		marginBottom: 20,
	}
})