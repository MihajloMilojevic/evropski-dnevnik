import React from "react";
import {Text, StyleSheet, Pressable} from "react-native";

export default function CustomButton({title, onPress}) 
{
    return (
    <Pressable
        style={styles.dugme}
        onPress={onPress}>
        <Text>{title}</Text>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    dugme: {
        backgroundColor: '#6da0ed',
        color: '#fff',
        padding: 10,
        margin: 5,
        borderRadius: 5
    }
})