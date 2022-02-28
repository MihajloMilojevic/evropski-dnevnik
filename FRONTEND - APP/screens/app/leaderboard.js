import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, FlatList, StatusBar, ImageBackground } from "react-native";
import {useSelector} from "react-redux";
import LeaderbeardItem from "../../components/leaderBoardItem";
import pozadina from "../../assets/pozadine/mithsBcg.png";
import LoadingModal from "../../components/loadingModal";
import MessageModal from "../../components/messageModal";


export default function Leaderboard({ navigation }) {
    
    const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState({
		show: false,
		title: "",
		message: "",
		onPress: () => {}
	})

	const host = useSelector(state => state.host)
    const URL = host + "/api/users/leaderboard";

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await fetch(URL);
            const json = await res.json();
            setLoading(false)
            if(!json.ok)
            {
                setModal({
					title: "Greška",
					message: json.message,
					show: true,
					onPress: () => navigation.navigate("home")
				})
                return ;
            }
            setData(json.users);
        } catch (error) {
            setLoading(false)
            setModal({
                title: "Greška",
                message: "Došlo je do greške, probajte ponovo kasnije.",
                show: true,
                onPress: () => navigation.navigate("home")
            })
        }
    }

    const renderItem = ({item, index}) => <LeaderbeardItem rank={index + 1} user={item}/>
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ImageBackground style={styles.container} source={pozadina} resizeMode={"cover"}>
            <MessageModal title={modal.title} message={modal.message} showModal={modal.show} onPress={modal.onPress}/>
            <LoadingModal showModal={loading}/>
            <Text style={styles.text}>TOP LISTA</Text>
            <FlatList
                style={{
                    width: "100%",
                    marginBottom: 50
                }}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </ImageBackground>
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
        fontStyle: "italic",
        marginTop: 20,
    }
})