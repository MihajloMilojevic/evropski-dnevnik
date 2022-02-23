import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable} from "react-native";
import getUser from "../../utils/getUser";
import removeUser from "../../utils/removeUser";
import CustomButton from "../../components/customButton";

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
			<CustomButton
				title={"Izloguj se"}
				onPress={logoutButton}
			/>
			<CustomButton
				title={"Mitovi"}
				onPress={() => navigation.navigate("miths")}
			/>
			<CustomButton
				title={"Biblioteka"}
				onPress={() => navigation.navigate("biblioteka")}
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