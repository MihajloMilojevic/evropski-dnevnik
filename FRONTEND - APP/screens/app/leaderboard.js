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
        <View style={styles.container}>
            {/*<ImageBackground style={styles.container} source={pozadina} resizeMode={"cover"}>*/}
            <MessageModal title={modal.title} message={modal.message} showModal={modal.show} onPress={modal.onPress}/>
            <LoadingModal showModal={loading}/>
            <Text style={styles.title}>TOP LISTA</Text>
            <View  style={[styles.itemContainer]}>
                <Text style={[styles.rank, styles.text, styles.rankTekst]}>Rank</Text>
                <Text style={[styles.name, styles.text]}>Igrač</Text>
                <Text style={[styles.points, styles.text, styles.pointsTekst]}>Poeni</Text>
		    </View>
            <FlatList
                style={{
                    width: "100%",
                    marginBottom: 50
                }}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
         {/*</ImageBackground>*/}
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
    itemContainer: {
		display: "flex",
		flexDirection: "row",
		minHeight: 75,
		justifyContent: "center",
		//borderWidth: 1,
		//borderRadius: 5,
		//marginLeft: 10,
		//marginRight: 10,
		//marginTop: 5,
		//marginBottom: 5,
		//backgroundColor: "#f8f9fa",
		width: "100%"
	},
    title: {
        color: "black",
        fontSize: 50,
        fontWeight: "bold",
        //fontStyle: "italic",
        marginTop: 20,
    },
    text: {
		alignSelf: "center",
		textAlign: "center",
		fontSize: 16,
		color: "#000"
	},
	rank: {
		flex: 1,
	},
    rankTekst: {
        fontWeight: "bold",
    },
	name: {
		flex: 2,
		fontWeight: "bold"
	},
	points: {
		flex: 1,
		fontWeight: "bold"
	},
})