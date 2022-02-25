import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable} from "react-native";
import { removeUser } from "../../redux";
import {useSelector, useDispatch} from "react-redux";
import CustomButton from "../../components/customButton";

export default function Home({navigation})
{
	const [user, setUser] = useState(useSelector(state => state.user));
	const dispatch = useDispatch();

	const logoutButton = async () => {
		dispatch(removeUser())
		Alert.alert("Uspeh", "Uspešno odjavljen")
		navigation.replace("login")
	}

	return (
		<View style={styles.container}>
			<Text>Zdravo, {user.username}</Text>
			<CustomButton
				title={"Izloguj se"}
				onPress={logoutButton}
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