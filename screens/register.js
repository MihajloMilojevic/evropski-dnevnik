import React from "react";
import {useState} from "react";
import {View, Text, TextInput, StyleSheet, Button} from "react-native";

const URL = "https://evropski-dnevnik-dev.herokuapp.com/api/users/register";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	return (
		<View style={styles.container}>
			<Text style={styles.header}>REGISTRACIJA</Text>
			<Text>Korisničko ime</Text>
			<TextInput
				style={styles.input}
				onChangeText={newUsername => {
					setUsername(newUsername);
				}}
			/>
			<Text>Email</Text>
			<TextInput
				style={styles.input}
				keyboardType="email-address"
				onChangeText={newEmail => {
					setEmail(newEmail);
				}}
			/>
			<Text>Lozinka</Text>
			<TextInput
				style={styles.input}
				secureTextEntry={true}
				onChangeText={newPassword => {
					setPassword(newPassword);
				}}
			/>
			<Button 
				title="Register"
				onPress={async () => {
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
				}}	
			></Button>
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
		paddingLeft: 10,
		borderColor: "black",
		borderWidth: 2
	}
  });