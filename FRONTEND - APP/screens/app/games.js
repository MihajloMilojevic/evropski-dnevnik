import Miths from "./miths";
import Quiz from "./quiz";
import ImageQuiz from "./imageQuiz";
import Memory from "./memory";
import {View, Text, StyleSheet, ImageBackground} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LevelSelect from "./levelSelect";
//import pozadina from "../../assets/pozadine/mithsBcg.png";

const Stack = createStackNavigator();

export default function Games({navigation}) {
    // return (<View style={styles.container}>
    //     <Text>Games</Text>
    // </View>)
    return (
        //<ImageBackground style={styles.container} source={pozadina} resizeMode={"cover"}>
            <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="select"
                component={LevelSelect}
                options={{
					unmountOnBlur: true
				}}
            />
            <Stack.Screen 
                name="mith"
                component={Miths}
            />
            <Stack.Screen 
                name="quiz"
                component={Quiz}
            />
            <Stack.Screen 
                name="image"
                component={ImageQuiz}
            />
            <Stack.Screen 
                name="memory"
                component={Memory}
            />
        </Stack.Navigator>
        //</ImageBackground>
    )
}
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
      color: "white",
	  alignItems: 'center',
	  justifyContent: 'center',
	}
})