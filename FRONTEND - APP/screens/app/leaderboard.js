import { View, Text, StyleSheet } from "react-native";

export default function Leaderboard({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Dobrodošao u biblioteku</Text>
            <View style={styles.red}>
                <Text>Ovo je prvi red</Text>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "dodgerblue",
    },
    red: {
        top: 1,

    }
})