import { Miths } from "..";
import {View, Text, StyleSheet} from "react-native";

export default function Games({navigation}) {
    return (
        <View style={styles.container}>
            <Text>GAMES</Text>
        </View>
    )/*
    return (
        <Miths navigation={navigation}/>
    );*/
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