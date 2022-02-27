import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable, ImageBackground, Image} from "react-native";
import CollapseUputstvo from "../components/collapseUputstvo";
import {useSelector, useDispatch} from "react-redux";
import CustomButton from "../components/customButton";
import pozadina from "../assets/pozadine/loadBcg.png";

export default function Oaplikaciji({navigation})
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
			<Text style={styles.naslov}>O aplikaicji</Text>
            <CustomButton
                title={"Nazad"}
                onPress={() => navigation.goBack()}
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
        marginTop: 20,
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
	},
})