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
		<ImageBackground source={pozadina} resizeMode={"cover"} style={styles.container} imageStyle= 
		{{opacity:0.5}}>
			<MessageModal title={modal.title} message={modal.message} showModal={modal.show} onPress={modal.onPress}/>
			<Text style={styles.zdravo}>Profil igrača</Text>
			<View style={styles.info}>
				<Text style={styles.naslov}>Ime:</Text>
				<Text style={styles.tekst}>{user.username}</Text>
			</View>
			<View style={styles.hairline} />
			<View style={styles.info}>
				<Text style={styles.naslov}>Mejl:</Text>
				<Text style={styles.tekst}>{user.email}</Text>
			</View>
			<View style={styles.hairline} />
			{
				user.level !== 13 ?
				<View style={styles.info}>
					<Text style={styles.naslov}>Nivo:</Text>
					<Text style={styles.tekst}>{user.level}</Text>
				</View>
				:
				<View style={{
					display: "flex",
					flexDirection: "row"
				}}>
					<View style={styles.info}>
						<Text style={styles.naslov}>Nivo:</Text>
						<FontAwesome name={"trophy"} size={30} color={"#3268B8"} style={styles.trofej}/>
					</View>
					
				</View>
			}
			<View style={styles.hairline} />
			<View style={styles.info}>
				<Text style={styles.naslov}>Poeni:</Text>
				<Text style={styles.tekst}>{user.points}</Text>
			</View>
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
	naslov: {
		fontSize: 22,
		color: "#000",
		fontWeight: "bold",
		textAlign: "center"
	},
    tekst: {
        color: "#000",
        fontSize: 20,
		fontStyle: "italic",
		textAlign: "center",
    },
    dugme: {
        marginTop: 40,
    },
	trofej: {
		textAlign: "center"
	},
	hairline: {
        backgroundColor: '#3268B8',
        height: 2,
        width: "90%",
		margin: 0
    },
	info: {
		width: "90%",
		margin: 0,
		paddingTop: 10,
		paddingBottom: 10
	}
})