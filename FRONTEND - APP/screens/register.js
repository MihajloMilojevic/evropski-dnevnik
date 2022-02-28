import React from "react";
import {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button, Pressable, Alert, ImageBackground, Image} from "react-native";
import { Colors, TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo';
import CustomButton from "../components/customButton";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux";
import backSlika from "../assets/pozadine/registerBcg.png";
import gornjaSlika from "../assets/slike/register.png";
import MessageModal from "../components/messageModal";
import LoadingModal from "../components/loadingModal";

export default function Register({navigation}) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordHidden, setPasswordHidden] = useState(true);
	const [loading, setLoading] = useState(false)
	const [modal, setModal] = useState({
		show: false,
		title: "",
		message: "",
		onPress: () => {}
	})

	const dispatch = useDispatch();
	const host = useSelector(state => state.host)

	const URL = host + "/api/users/register";
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
			setLoading(true)
			const odg = await fetch(URL, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({username, email, password}),
			})
			const data = await odg.json();
			setLoading(false)
			if(data.ok)
			{
				dispatch(setUser({...data.user, token: data.token}))
				setModal({
					title: "Uspeh",
					message: "Uspešno ste se registrovali",
					show: true,
					onPress: () => navigation.replace("app")
				})
			}
			else
			{
				setModal({
					title: "Greška",
					message: data.message,
					show: true,
					onPress: () => setModal({
						...modal,
						show: false
					})
				})
			}
		} catch (error) {
			console.error(error);
			setLoading(false)
		}
	}
	const goToLogin = () => {
		navigation.replace("login");
	}
	return (
		<ImageBackground source={backSlika} resizeMode={"cover"} style={styles.container}>
			<MessageModal title={modal.title} message={modal.message} showModal={modal.show} onPress={modal.onPress}/>
			<LoadingModal showModal={loading}/>
			<Image
				style={styles.slika}
				source={gornjaSlika}
			></Image>
			<Text style={styles.header}>Otvorite svoj nalog</Text>
			<TextInput
				style={styles.input}
				onChangeText={usernameChange}
				placeholder={"korisničko ime"}
				activeUnderlineColor={"#3268B8"}
				underlineColor={"#AF9E00"}
			/>
			<TextInput
				style={styles.input}
				keyboardType="email-address"
				onChangeText={emailChange}
				placeholder={"mejl"}
				activeUnderlineColor={"#3268B8"}
				underlineColor={"#AF9E00"}
			/>
			<TextInput
				placeholder={"šifra"}
				style={styles.input}
				secureTextEntry={passwordHidden}
				onChangeText={passwordChange}
				activeUnderlineColor={"#3268B8"}
				underlineColor={"#AF9E00"}
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