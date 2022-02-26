import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, FlatList, StatusBar } from "react-native";
import {useSelector} from "react-redux";
import LeaderbeardItem from "../../components/leaderBoardItem";


export default function Leaderboard({ navigation }) {
    
    const [data, setData] = useState([])
    
	const host = useSelector(state => state.host)
    const URL = host + "/api/users/leaderboard";

    const fetchData = async () => {
        try {
            const res = await fetch(URL);
            const json = await res.json();
            if(!json.ok)
            {
                Alert.alert("Greška", json.message);
                return navigation.navigate("home");
            }
            setData(json.users);
        } catch (error) {
            Alert.alert("Greška", "Došlo je do greške, probajte ponovo kasnije.");
            navigation.navigate("home");
        }
    }

    const renderItem = ({item, index}) => <LeaderbeardItem rank={index + 1} user={item}/>
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>TOP PLAYERS</Text>
            <FlatList
                style={{
                    width: "100%",
                    marginBottom: 30
                }}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: StatusBar.currentHeight
        //backgroundColor: "dodgerblue",
    },
    text: {
        color: "black",
        fontSize: 50,
        fontWeight: "bold",
        fontStyle: "italic"
    }
})