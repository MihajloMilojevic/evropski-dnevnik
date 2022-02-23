import React from "react";
import {useState, useEffect} from "react";
import {View, StyleSheet, Button} from "react-native";
import CustomButton from "../components/customButton";
import getUser from "../utils/getUser";

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

	goToLogin = () => {
		navigation.replace("login")
	}
	
	goToRegister = () => {
		navigation.replace("register")
	}


	if(!checked)
		return (<View></View>)
	else 
		return (
			<View
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
			</View>
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