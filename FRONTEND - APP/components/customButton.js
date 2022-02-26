import React from "react";
import {Text, StyleSheet, Pressable} from "react-native";

export default function CustomButton({title, onPress}) 
{
    return (
    <Pressable
        style={styles.dugme}
        onPress={onPress}>
        <Text style={styles.tekst}>{title}</Text>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    dugme: {
        backgroundColor: '#3268B8',
        padding: 10,
        margin: 5,
        borderRadius: 5
    },
    tekst: {
        color: "#fff",
    }
})