import { Miths } from "..";
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