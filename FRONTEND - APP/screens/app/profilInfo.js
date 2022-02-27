import React from "react";
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, Alert, Pressable, ImageBackground, Image} from "react-native";
import { removeUser } from "../../redux";
import {useSelector, useDispatch} from "react-redux";
import CustomButton from "../../components/customButton";
import pozadina from "../../assets/pozadine/profilBcg.png";
import MessageModal from "../../components/messageModal";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Profil({navigation})
{
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [modal, setModal] = useState({
		show: false,
		title: "",
		message: "",
		onPress: () => {}
	})

	const logoutButton = async () => {
		dispatch(removeUser())
		setModal({
			title: "Uspeh",
			message: "Uspešno odjavljen.",
			show: true,
			onPress: () => navigation.replace("login")
		})		
	}

	return (
		<ImageBackground source={pozadina} resizeMode={"cover"} style={styles.container}>
			<MessageModal title={modal.title} message={modal.message} showModal={modal.show} onPress={modal.onPress}/>
			<Text style={styles.zdravo}>Profil igrača</Text>
			<Text style={styles.tekst}>Ime: {user.username}</Text>
			<Text style={styles.tekst}>Mejl: {user.email}</Text>
			{
				user.level !== 13 ?
				<Text style={styles.tekst}>Nivo: {user.level}</Text>
				:
				<View style={{
					display: "flex",
					flexDirection: "row"
				}}>
					<Text  style={styles.tekst}>Nivo: </Text>
					<FontAwesome name={"trophy"} size={30} color={"#3268B8"}/>
				</View>
			}
			<Text style={styles.tekst}>Poeni: {user.points}</Text>
			<CustomButton
				title={"Izloguj se"}
				onPress={logoutButton}
                containerStyle={styles.dugme}
			/>
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
	zdravo: {
		color: "#000",
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
        marginBottom: 40,
	},
    tekst: {
        color: "#000",
        fontSize: 20,
    },
    dugme: {
        marginTop: 40,
    }
})