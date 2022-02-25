import React from "react";
import {useState} from "react";
import {View, Text, StyleSheet, Button, Pressable, Alert, ImageBackground, Image, ColorPropType} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo';
import CustomButton from "../components/customButton";
import setUser from "../utils/setUser";
import backSlika from "../assets/pozadine/loginBcg.png";
import gornjaSlika from "../assets/slike/unlock.png";


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
				const set = await setUser({...data.user, token: data.token});
				if(set)
				{
					Alert.alert("Uspeh", `Uspešno prijavljen kao ${data.user.username}`);
					navigation.replace("app");
				}
				else
				{
					Alert.alert("Greska", `Došlo je do greške. Probajte ponovo`);
				}
			}
			else
				Alert.alert("Greška", data.message);
		} catch (error) {
			console.error(error);
		}
	}
	const goToRegister = () => {
		navigation.replace("register")
	}
	return (
		<ImageBackground source={backSlika} resizeMode={"cover"} style={styles.container}>
			<Image
				style={styles.slika}
				source={gornjaSlika}
			>
			</Image>
			<Text style={styles.header}>Prijavite se na nalog</Text>
			
			<TextInput
			placeholder={"mejl"}
				style={styles.input}
				keyboardType="email-address"
				onChangeText={emailChange}
			/>
			<TextInput
				placeholder={"šifra"}
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

			<CustomButton
				title={"Prijava"}
				onPress={loginButton}
			/>
			<Text>Nemate nalog?</Text>
			<Pressable
				onPress={goToRegister}
				
			><Text style={styles.register}>Registrujte se </Text></Pressable>
			
		</ImageBackground>
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
		fontSize: 20,
		color: "#000",
		textAlign: "center"
	},
	input: {
		width: 200,
		height: 30,
		paddingBottom: 0,
		paddingTop: 0,
		margin: 20
	},
	slika: {
		width: 110,
		height: 200
	},
	register: {
		color: "#3268B8",
		textDecorationLine: "underline"
	}
  });