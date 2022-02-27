import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable, ImageBackground, Image} from "react-native";
import CollapseUputstvo from "../components/collapseUputstvo";
import {useSelector, useDispatch} from "react-redux";
import CustomButton from "../components/customButton";
import pozadina from "../assets/pozadine/loadBcg.png";

export default function Uputstvo({navigation})
{
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	{/*const logoutButton = async () => {
		dispatch(removeUser())
		Alert.alert("Uspeh", "Uspešno odjavljen")
		navigation.replace("login")
	}*/}

	return (
		<ImageBackground source={pozadina} resizeMode={"cover"} style={styles.container}>
			<Text style={styles.naslov}>UPUTSTVO</Text>
			<Text style={styles.tekst}>Kliknite na naslov u delu koji Vas zanima</Text>
			<CollapseUputstvo
				title={"Početna strana"}
				tekst={"Na početnoj strani pored dugmeta Uputstva možete videti i logo naše aplikacije..."}
			/>
			<CollapseUputstvo
				title={"Lista igrača"}
				tekst={"Na listi igrača su prikazani igrači i njihovi poeni, možete se takmičiti sa ostalima i osvojiti prvo mesto."}
			/>
			<CollapseUputstvo
				title={"Strana sa igricama"}
				tekst={"Klikom na zvezdicu ulazite na određebni nivo, ako je zvezdica plava znači da ste uspešno prešli nivo, ako je zlatna onda ga tek prelazite, a ako je izbledela za katancem odna Vam je nivo zaključan. Da biste otključali novi nivo potrebno je preći prethodni. Ispod su opisane sve vrste igara."}
			/>
			<CollapseUputstvo
				title={"Mitovi"}
				tekst={"Dobili ste karticu u kojoj stoji mit. Igra se bazira na Tačno - Netačno sistemu. Kada karticu povučete desno, odgovorili ste Tačno, u suprotnom odgovorili ste netačno. Cilj je da odgovorite da li je mit koji je na kartici tačan ili je netačan."}
			/>
			<CollapseUputstvo
				title={"Kviz"}
				tekst={"U kvizu je poenta da klikom na ponuđeni odgovor dođete do tačnog rešenja i pređete level."}
			/>
			<CustomButton 
				title={"Nazad"} 
				onPress={() => {navigation.goBack()}}
				containerStyle={styles.dugme}
				textStyle = {styles.dugmeTekst}
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
		alignSelf: "center",
	},
	naslov: {
		fontSize: 24,
		fontWeight: "bold",
		alignSelf: "center"
	},
	tekst: {
		textAlign: "center",
		paddingLeft: 40,
		paddingRight: 40,
		marginBottom: 20,
	},
})