import React from "react";
import {useState} from "react";
import {View, Text, StyleSheet, Button, Pressable, Alert} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo';
import setUser from "../utils/setUser";


const URL = "https://evropski-dnevnik-dev.herokuapp.com/api/users/login";

export default function Login({navigation}) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordHidden, setPasswordHidden] = useState(true);

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
			{
				const set = await setUser(data.user.username);
				if(set)
				{
					Alert.alert("Uspeh", `Uspešno prijavljen kao ${data.user.username}`);
					navigation.replace("home");
				}
				else
				{
					Alert.alert("Greska", `Došlo je do greske. Probajte ponovo`);
				}
			}
			else
				Alert.alert("Greska", data.message);
		} catch (error) {
			console.error(error);
		}
	}
	const goToRegister = () => {
		navigation.replace("register")
	}
	return (
		<View style={styles.container}>
			<Text style={styles.header}>PRIJAVA</Text>
			
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
				title="Prijava"
				onPress={loginButton}	
			></Button>
			<Text>Nemate nalog?</Text>
			<Pressable
				onPress={goToRegister}
			>
				<Text> Registrujte se.</Text>
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
  });