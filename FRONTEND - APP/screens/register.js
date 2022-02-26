import React from "react";
import {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button, Pressable, Alert, ImageBackground, Image} from "react-native";
import { Colors, TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo';
import CustomButton from "../components/customButton";
import {useDispatch} from "react-redux";
import {setUser} from "../redux";
import backSlika from "../assets/pozadine/registerBcg.png";
import gornjaSlika from "../assets/slike/register.png";

const URL = "https://evropski-dnevnik-dev.herokuapp.com/api/users/register";

export default function Register({navigation}) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordHidden, setPasswordHidden] = useState(true);

	const dispatch = useDispatch();

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
				Alert.alert("Uspeh", "Uspešno ste se registrovali");
				dispatch(setUser({...data.user, token: data.token}))
				navigation.replace("app");
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
		<ImageBackground source={backSlika} resizeMode={"cover"} style={styles.container}>
			<Image
				style={styles.slika}
				source={gornjaSlika}
			></Image>
			<Text style={styles.header}>Otvorite svoj nalog</Text>
			<TextInput
				style={styles.input}
				onChangeText={usernameChange}
				placeholder={"korisničko ime"}
			/>
			<TextInput
				style={styles.input}
				keyboardType="email-address"
				onChangeText={emailChange}
				placeholder={"mejl"}
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
				title={"Registruj se"}
				onPress={registerButton}
			/>
			<Text>Imete nalog?</Text>
			<Pressable
				onPress={goToLogin}
			>
				<Text style={styles.prijava}> Prijavite se.</Text>
			</Pressable>
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
		textAlign: "center",
		color: "#000",
		paddingBottom: 50
	},
	input: {
		marginBottom: 20,
		width: 200,
		height: 30,
		paddingBottom: 0,
		paddingTop: 0
	},
	slika: {
		width: 200,
		height: 200
	},
	prijava: {
		color: "#3268B8",
		textDecorationLine: "underline"
	}
})