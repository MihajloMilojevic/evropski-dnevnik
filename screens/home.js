import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert} from "react-native";
import getUser from "../utils/getUser";
import removeUser from "../utils/removeUser";

export default function Home({navigation})
{
	const [username, setUsername] = useState("")

	const logoutButton = async () => {
		const removed = await removeUser();
		if(removed)
		{
			Alert.alert("Uspeh", "Uspesno odjavljen")
			navigation.replace("login")
		}
		else
			Alert.alert("Greska", "Došlo je do greške. Probajte ponovo");
	}

	useEffect(() => {
		(async () => {
			const user = await getUser();
			if(user !== null)
			{
				setUsername(user.username);
			}
		})()
	}, [])
	return (
		<View style={styles.container}>
			<Text>ZDRAVO {username}</Text>
			<Button
				title="Odjava"
				onPress={logoutButton}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
})