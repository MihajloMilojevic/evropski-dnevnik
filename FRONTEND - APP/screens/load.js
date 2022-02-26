import React from "react";
import {useState, useEffect} from "react";
import {View, StyleSheet, Button, ImageBackground, Image, Text, Pressable} from "react-native";
import { setUser } from "../redux";
import { useDispatch} from "react-redux";
import CustomButton from "../components/customButton";
import getUser from "../utils/getUser";
import backSlika from "../assets/pozadine/loadBcg.png";
import gornjaSlika from "../assets/slike/logo1.png";

export default function Load({navigation})
{
	const [checked, setChecked] = useState(false)
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			let user = await getUser();
			if(user !== null)
			{
				dispatch(setUser(user))
				navigation.replace("app");
			}
			else
				setChecked(true)
		})()
	}, [])

	const goToLogin = () => {
		navigation.replace("login")
	}
	
	const goToRegister = () => {
		navigation.replace("register")
	}


	if(!checked)
		return (<View></View>)
	else 
		return (
			<ImageBackground source={backSlika} resizeMode={"cover"}
				style={styles.container}
			>
				<Image
					style={styles.slika}
					source={gornjaSlika}
				>
				</Image>
				<Text style={styles.header}>Dobrodošli, izaberite
jednu od ponuđenih
opcija</Text>
				<CustomButton
					title={"Registruj se"}
					onPress={goToRegister}
					containerStyle={styles.dugme1}
					textStyle={styles.dugme1tekst}
				/>
				<CustomButton
					title={"Prijavi se"}
					onPress={goToLogin}
					containerStyle={styles.dugme2}
					textStyle={styles.dugme2tekst}
				/>
			</ImageBackground>
		)

}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	slika: {
		width: 200,
		height: 200,
		marginBottom: 20
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		margin: 30
	},
	uputstvo: {
		color: "#3268B8",
		textDecorationLine: "underline"
	},
	textIspod: {
		marginTop: 30
	},
	dugme1: {
		backgroundColor: '#3268B8',
		width: 100
	},
	dugme2: {
		backgroundColor: '#EBEBEB',
		width: 100,
		borderColor: "#3268B8",
		borderWidth: 2
	},
	dugme1tekst: {
		textAlign: "center",
		color: "#EBEBEB",
	},
	dugme2tekst: {
		textAlign: "center",
		color: "#000",
	}
})