import React from "react";
import {useState} from "react";
import {View, Text, TextInput, StyleSheet, Button, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

const URL = "https://evropski-dnevnik-dev.herokuapp.com/api/users/register";

export default function Register({navigation}) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordHidden, setPasswordHidden] = useState(true);
	const [message, setMessage] = useState("");

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
				setMessage("Uspešno registrovan");
			}
			else
			{
				setMessage(data.message);
			}
		} catch (error) {
			console.error(error);
		}
	}
	const goToLogin = () => {
		navigation.navigate("login");
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
			<View style={[styles.input, styles.inline]}>
				<TextInput
					secureTextEntry={passwordHidden}
					onChangeText={passwordChange}
				/>
				<Icon 
					name={passwordHidden ? "eye-with-line" : "eye"}
					size={20}
					onPress={togglePasswordVisibility}
				/>
			</View>
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
			<Text>{message}</Text>
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
		padding: 0,
		margin: 3,
		paddingLeft: 10,
		borderColor: "black",
		borderWidth: 2
	},
	inline: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 10,
		paddingRight: 10
	}
})