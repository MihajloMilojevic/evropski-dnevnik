import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable, ImageBackground, Image, Linking} from "react-native";
import CollapseUputstvo from "../components/collapseUputstvo";
import {useSelector, useDispatch} from "react-redux";
import CustomButton from "../components/customButton";
import pozadina from "../assets/pozadine/loadBcg.png";

const URL1 = "https://www.mei.gov.rs/upload/documents/publikacije/Brosure%20nove/mitovi_o_eu%281%29.pdf"
const URL2	 = "https://europa.rs/evropskidnevnik/eu-dnevnik-2021-22/"
const EMAIL = "euroquiz2022@gmail.com"


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
Tim se sastoji od tri učenika: <Text style={styles.boldirano}>Mihajlo Milojević, Vojin Šundović i Ana Luković</Text> 
			</Text>
			<Text style={styles.tekst}>	Koriščena literatura: </Text>
			<Text style={styles.link} onPress={() => {Linking.openURL(URL2)}}>EVROPSKI DNEVNIK</Text>
			<Text style={styles.link} onPress={() => {Linking.openURL(URL1)}}>MITOVI O EU</Text>
            
			<Text style={[styles.tekst, {marginTop: 10}]}>Naš email: </Text>
			<Text style={styles.link} onPress={() => {Linking.openURL(`mailto:${EMAIL}`)}}>{EMAIL}</Text>
			<CustomButton
                title={"Nazad"}
                onPress={() => navigation.goBack()}
                containerStyle={styles.dugme}
            />
		</ImageBackground>
	);
}
const styles = StyleSheet.create({
	link: {
		fontSize: 16,
		fontStyle: "italic",
		textDecorationLine: "underline",
		textDecorationColor: "#3268B8",
		textDecorationStyle: "dashed"
		
	},
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
	},
	tekst: {
		textAlign: "center",
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 20,
		fontSize: 18,
		lineHeight: 25,
	},
	boldirano: {
		fontWeight: "bold",
	},
	hairline: {
        backgroundColor: '#3268B8',
        height: 2,
        width: "90%",
		margin: 0,
		marginVertical: 20
    },
})