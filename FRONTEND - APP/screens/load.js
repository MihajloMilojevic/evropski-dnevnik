import React from "react";
import {useState, useEffect} from "react";
import {View, StyleSheet, Button, ImageBackground} from "react-native";
import CustomButton from "../components/customButton";
import getUser from "../utils/getUser";
import backSlika from "../assets/pozadine/loadBcg.png";

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
				<CustomButton
					title={"Registruj se"}
					onPress={goToRegister}
				/>
				<CustomButton
					title={"Prijavi se"}
					onPress={goToLogin}
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
})