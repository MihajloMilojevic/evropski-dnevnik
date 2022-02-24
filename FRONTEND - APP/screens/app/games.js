import Miths from "./miths";
import Quiz from "./quiz";
import ImageQuiz from "./imageQuiz";
import {View, Text, StyleSheet} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LevelSelect from "./levelSelect";

const Stack = createStackNavigator();

export default function Games({navigation}) {
    // return (<View style={styles.container}>
    //     <Text>Games</Text>
    // </View>)
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="select"
                component={LevelSelect}
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
        </Stack.Navigator>
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