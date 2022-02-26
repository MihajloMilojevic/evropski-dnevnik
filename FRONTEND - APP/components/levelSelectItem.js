import { Pressable, ImageBackground, Text, StyleSheet, Alert } from "react-native";
import {passed, current, locked} from "../assets/zvezde";
import {useSelector} from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function LevelSelectItem({item, navigation, level}) {

	const user = useSelector(state => state.user);
	const host = useSelector(state => state.host);

	const URL = host + "/api/levels/";

	let starImage;
	let color;
	let islocked = false;
	if(level < user.level)
	{
		starImage = passed;
		color = "#3268B8"
	}
	else if(level > user.level)
	{
		starImage = locked;
		color = "#3268B8"
		islocked = true;
	}
	else
	{
		starImage = current
		color = "#AF9E00"
	}
	return (
	  <Pressable 
		style={styles.element}
		onPress={async () => {
			if(level > user.level) {
				Alert.alert("Zaključano", "Prvo pređite sve prethodne nivoe");
				return;
			}
			try {
				const res = await fetch(URL + level);
				const json = await res.json();
				if(!json.ok)
				{
					Alert.alert("Greška", "RESPONSE ERROR");
					return;
				}
				switch (json.type) {
					case "mith":
						navigation.navigate("mith", {mith: json.mith, level})
						break;
					case "quiz":
						navigation.navigate("quiz", {quiz: json.quiz, level})
						break;
					case "image":
						navigation.navigate("image", {image: json.quiz, level})
						break;
					case "memory":
						navigation.navigate("memory", {memory: json.memory, level})
						break;
					default:
						break;
				}
			} catch (error) {
				Alert.alert("Greška", "Došlo je do greške, probajte ponovo kasnije");
			}
		}}
	  >
		<ImageBackground
		  source={starImage} //{uri: "https://www.pngkey.com/png/full/4-44204_png-star-black-and-white-transparent-star-black.png"}
		  resizeMode="cover" 
		  style={styles.image}
		>
		  {
			  islocked ? <FontAwesome name="lock" size={20} color={color}/> : <Text style={{ color }}>{item.value}</Text>
		  }
		</ImageBackground>
	  </Pressable>
	)
  }

  
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	
 backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	element: {
	  //backgroundColor: "#6da0ed",
	  //borderRadius: 30,
	  aspectRatio: 1,
	  color: "black",
	  width: 80
	},
	image: {
	  flex: 1,
	  justifyContent: "center",
	  alignItems: "center",
	  color: "white"
	},
  });
  