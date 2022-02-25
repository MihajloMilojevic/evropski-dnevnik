import { Pressable, ImageBackground, Text, StyleSheet, Alert } from "react-native";
import starImage from "../assets/star.png";
import levelsDev from "../levelsDev.json";


export default function LevelSelectItem({item, navigation}) {
	return (
	  <Pressable 
		style={styles.element}
		onPress={() => {
			if(item.value % 4 === 0)
				return navigation.navigate("mith", levelsDev.mith);
			if(item.value % 4 === 1)
				return navigation.navigate("quiz", levelsDev.quiz);
			if(item.value % 4 === 2)
				return navigation.navigate("image", levelsDev.image);
			if(item.value % 4 === 3)
				return navigation.navigate("memory", levelsDev.memory);
		}}
	  >
		<ImageBackground
		  source={starImage} //{uri: "https://www.pngkey.com/png/full/4-44204_png-star-black-and-white-transparent-star-black.png"}
		  resizeMode="cover" 
		  style={styles.image}
		>
		  <Text style={styles.textColor}>{item.value}</Text>
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
	textColor: {
	  color: "blue"
	}
  });
  