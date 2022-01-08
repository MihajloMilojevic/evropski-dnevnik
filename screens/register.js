import React from "react";
import {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button, Pressable, Alert} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo';
import setUser from "../utils/setUser";

const URL = "https://evropski-dnevnik-dev.herokuapp.com/api/users/register";

export default function Register({navigation}) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordHidden, setPasswordHidden] = useState(true);

	

	const usernameChange = newUsername => {
		setUsername(newUsername);
	}
	const emailChange = newEmail => {
		setEmail(newEmail);
	}
	const passwordChange = newPassword => {
		setPassword(newPassword);
	}
	const togglePasswordVisibility = () => {
		setPasswordHidden(!passwordHidden);
	}
	const registerButton = async () => {
		try {
			const odg = await fetch(URL, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({username, email, password}),
			})
			data = await odg.json();
			if(data.ok)
			{
				Alert.alert("Uspeh", "Uspešno registrovan");
				const set = await setUser(data.user.username);
				if(set)
					navigation.replace("home");
				else
					navigation.replace("login");
			}
			else
			{
				Alert.alert("Greska", data.message);
			}
		} catch (error) {
			console.error(error);
		}
	}
	const goToLogin = () => {
		navigation.replace("login");
	}
	return (
		<View style={styles.container}>
			<Text style={styles.header}>REGISTRACIJA</Text>
			<Text>Korisničko ime</Text>
			<TextInput
				style={styles.input}
				onChangeText={usernameChange}
			/>
			<Text>Email</Text>
			<TextInput
				style={styles.input}
				keyboardType="email-address"
				onChangeText={emailChange}
			/>
			<Text>Lozinka</Text>
			<TextInput
				style={styles.input}
				secureTextEntry={passwordHidden}
				onChangeText={passwordChange}
				right={
					<TextInput.Icon 
						name={() => 
							<Icon 
							name={passwordHidden ? "eye-with-line" : "eye"}
							size={20}
							onPress={togglePasswordVisibility}
							/>}
					/>
					}
			/>
			<Button 
				title="Register"
				onPress={registerButton}	
			></Button>
			<Text>Imete nalog?</Text>
			<Pressable
				onPress={goToLogin}
			>
				<Text> Prijavite se.</Text>
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
	header: {
		fontWeight: "bold",
		fontSize: 20
	},
	input: {
		width: 200,
		height: 30,
		paddingBottom: 0,
		paddingTop: 0
	},
})