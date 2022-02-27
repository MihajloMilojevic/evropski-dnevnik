import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable, ImageBackground, Image} from "react-native";
import CollapseUputstvo from "../components/collapseUputstvo";
import {useSelector, useDispatch} from "react-redux";
import CustomButton from "../components/customButton";
import pozadina from "../assets/pozadine/loadBcg.png";

export default function Oaplikaciji({navigation})
{
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	{/*const logoutButton = async () => {
		dispatch(removeUser())
		Alert.alert("Uspeh", "Uspešno odjavljen")
		navigation.replace("login")
	}*/}

	return (
		<ImageBackground source={pozadina} resizeMode={"cover"} style={styles.container} imageStyle= 
		{{opacity:0.5}}>
			<Text style={styles.naslov}>O aplikaicji</Text>
			<View style={styles.hairline} />
			<Text style={styles.tekst}>
			Aplikacija je napravljena povodom konkursa <Text style={styles.boldirano}>"Evropa i ja"</Text>, u realizaciji aplikacije su učestvovali učenici trećeg razreda Elektro-saobraćajne
tehničke škole u Kraljevu, smera <Text style={styles.boldirano}>Elektrotehničar inforamacionih tehnologija</Text>.
Tim se sastoji od tri učenika: <Text style={styles.boldirano}>Mihajlo Milojević, Vojin Šundović i Ana Luković</Text>.
			</Text>
            <CustomButton
                title={"Nazad"}
                onPress={() => navigation.goBack()}
                containerStyle={styles.dugme}
            />
		</ImageBackground>
	);
}
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: "center",
	  justifyContent: 'center',
	},
	dugme: {
        marginTop: 20,
		alignSelf: "center",
	},
	naslov: {
		fontSize: 26,
		fontWeight: "bold",
		alignSelf: "center",
		marginBottom: 20,
	},
	tekst: {
		textAlign: "center",
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 20,
		fontSize: 18,
		lineHeight: 35,
		marginTop: 20
	},
	boldirano: {
		fontWeight: "bold",
	},
	hairline: {
        backgroundColor: '#3268B8',
        height: 2,
        width: "90%",
		margin: 0
    },
})