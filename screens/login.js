import React from "react";
import {useState} from "react";
import {View, Text, TextInput, StyleSheet, Button, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';


const URL = "https://evropski-dnevnik-dev.herokuapp.com/api/users/login";

export default function Login({navigation}) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordHidden, setPasswordHidden] = useState(true);
	const [message, setMessage] = useState("");

	const emailChange = newEmail => {
		setEmail(newEmail);
	}
	const passwordChange = newPassword => {
		setPassword(newPassword);
	}
	const togglePasswordVisibility = () => {
		setPasswordHidden(!passwordHidden);
	}
	const loginButton = async () => {
		try {
			const odg = await fetch(URL, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password}),
			})
			data = await odg.json();
			if(data.ok)
				setMessage(`Uspešno prijavljen kao ${data.user.username}`);
			else
				setMessage(data.message);
		} catch (error) {
			console.error(error);
		}
	}
	const goToRegister = () => {
		navigation.navigate("register")
	}
	return (
		<View style={styles.container}>
			<Text style={styles.header}>PRIJAVA</Text>
			
			<Text>Email</Text>
			<View style={styles.input}>
				<TextInput
					keyboardType="email-address"
					onChangeText={emailChange}
				/>
			</View>
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
				title="Prijava"
				onPress={loginButton}	
			></Button>
			<Text>Nemate nalog?</Text>
			<Pressable
				onPress={goToRegister}
			>
				<Text> Registrujte se.</Text>
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
  });