import React from "react";
import {useState, useEffect} from "react";
import {View, StyleSheet, Button, ImageBackground, Image, Text, Pressable} from "react-native";
import CustomButton from "../components/customButton";
import getUser from "../utils/getUser";
import backSlika from "../assets/pozadine/loadBcg.png";
import gornjaSlika from "../assets/slike/logo1.png";

export default function Load({navigation})
{
	const [checked, setChecked] = useState(false)
	useEffect(() => {
		(async () => {
			const user =await getUser();
			if(user !== null)
			{
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
				/>
				<CustomButton
					title={"Prijavi se"}
					onPress={goToLogin}
				/>
				<Text style={styles.textIspod}>Ne znate kako da koristite aplikaciju?</Text>
				<Pressable

					
				><Text style={styles.uputstvo}>Pogledajte upustvo</Text></Pressable>
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
	}
})