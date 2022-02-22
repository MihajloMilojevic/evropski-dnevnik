import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable} from "react-native";
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
			<Text>Zdravo, {username}</Text>
			<Pressable
				style={styles.dugme}
				onPress={logoutButton}>
				<Text>Izloguj se</Text>
				
			</Pressable>
			<Pressable
				style={styles.dugme}
				onPress={() => navigation.navigate("miths")}>
				<Text>Mitovi</Text>
				
			</Pressable>
			<Pressable
				style={styles.dugme}
				onPress={() => navigation.navigate("biblioteka")}>
				<Text>Biblioteka</Text>
				
			</Pressable>
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
	dugme: {
		backgroundColor: '#6da0ed',
		color: '#fff',
		padding: 10,
		margin: 5,
		borderRadius: 5
	}
})