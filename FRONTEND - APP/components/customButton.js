import React from "react";
import {Text, StyleSheet, Pressable} from "react-native";

export default function CustomButton({title, onPress, cointainerStyle, textStyle}) 
{
    return (
    <Pressable
        style={[styles.dugme, cointainerStyle]}
        onPress={onPress}>
        <Text style={[styles.tekst, textStyle]}>{title}</Text>
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