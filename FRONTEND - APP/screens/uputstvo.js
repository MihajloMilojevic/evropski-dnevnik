import React from "react";
import { useState, useEffect } from "react";
import {Dimensions, View, Text, StyleSheet, Button, Alert, Pressable, ImageBackground, Image, ScrollView, StatusBar} from "react-native";
import CollapseUputstvo from "../components/collapseUputstvo";
import {useSelector, useDispatch} from "react-redux";
import CustomButton from "../components/customButton";
import pozadina from "../assets/pozadine/loadBcg.png";

export default function Uputstvo({navigation})
{
	return (
		<View style={styles.containter}>
			<ScrollView 
				style={[styles.containter, styles.scrollview]}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<Text style={styles.naslov}>UPUTSTVO</Text>
				<Text style={styles.tekst}>Kliknite na naslov u delu koji Vas zanima</Text>
				<CollapseUputstvo
					title={"Početna strana"}
					tekst={"Na početnoj strani pored dugmeta Uputstva i O Aplikaciji možete videti i logo naše aplikacije..."}
				/>
				
				<CollapseUputstvo
					title={"Lista igrača"}
					tekst={"Na listi igrača su prikazani igrači i njihovi poeni, možete se takmičiti sa ostalima i osvojiti prvo mesto."}
				/>
				
				<CollapseUputstvo
					title={"Strana sa igricama"}
					tekst={"Klikom na zvezdicu ulazite na određebni nivo, ako je zvezdica zlatna znači da ste uspešno prešli nivo, ako je plava onda ga tek prelazite, a ako je izbledela za katancem onda Vam je nivo zaključan. Da biste otključali novi nivo potrebno je preći prethodni. Ispod su opisane sve vrste igara."}
				/>
				
				<CollapseUputstvo
					title={"Mitovi"}
					tekst={"Dobili ste karticu u kojoj stoji mit. Igra se bazira na Tačno - Netačno sistemu. Cilj je da utvrdite da li je mit koji je na kartici tačan ili je netačan. Prevucite karticu nadesno ako mislite da je mit tačan, a ulevo ako je netačan"}
				/>
				
				<CollapseUputstvo
					title={"Kviz"}
					tekst={"U kvizu je cilj da klikom na ponuđeni odgovor dođete do tačnog rešenja i pređete level."}
				/>
				
				<CustomButton 
					title={"Nazad"} 
					onPress={() => {navigation.goBack()}}
					containerStyle={styles.dugme}
					textStyle = {styles.dugmeTekst}
				/>
			</ScrollView>
			<ImageBackground 
				source={pozadina} 
				style={[
					styles.fixed, 
					styles.containter, 
					{zIndex: -1}]} 
				imageStyle={{opacity:0.5}}>
			</ImageBackground>
		</View>
	);
}
const styles = StyleSheet.create({
	containter: {
		marginTop: StatusBar.currentHeight,
		width: Dimensions.get("window").width, //for full screen
		height: Dimensions.get("window").height, //for full screen
	},
	fixed: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	scrollview: {
		backgroundColor: 'transparent',
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
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 20,
	},
})