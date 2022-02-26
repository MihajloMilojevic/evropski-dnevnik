import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable, ImageBackground, Image} from "react-native";
import { removeUser } from "../../redux";
import {useSelector, useDispatch} from "react-redux";
import CustomButton from "../../components/customButton";
import pozadina from "../../assets/pozadine/profilBcg.png";

export default function Profil({navigation})
{
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const logoutButton = async () => {
		dispatch(removeUser())
		Alert.alert("Uspeh", "Uspešno odjavljen")
		navigation.replace("login")
	}

	return (
		<ImageBackground source={pozadina} resizeMode={"cover"} style={styles.container}>
			<Text style={styles.zdravo}>Profil igrača</Text>
			<Text style={styles.tekst}>Ime: {user.username}</Text>
			<Text style={styles.tekst}>Mejl: {user.email}</Text>
			<Text style={styles.tekst}>Nivo: {user.level}</Text>
			<Text style={styles.tekst}>Poeni: {user.points}</Text>
			<CustomButton
				title={"Izloguj se"}
				onPress={logoutButton}
                containerStyle={styles.dugme}
			/>
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
		fontSize: 24,
		fontWeight: "bold",
        marginBottom: 40,
	},
    tekst: {
        color: "#000",
        fontSize: 20,
    },
    dugme: {
        marginTop: 40,
    }
})