import React from "react";
import {Text, StyleSheet, View} from "react-native";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

export default function CollapseUputstvo({title, tekst})
{
    return (
        <Collapse style={styles.prozor}>
			<CollapseHeader>
			<View>
				<Text style={styles.naslov}>{title}</Text>
			</View>
			</CollapseHeader>
			<CollapseBody>
				<Text style={styles.tekst}>{tekst}</Text>
			</CollapseBody>
		</Collapse>
    )
}

const styles = StyleSheet.create({
	naslov: {
		fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
	},
	tekst: {
		textAlign: "center",
		fontSize: 16,
		color: "#000",
        paddingLeft: 20,
        paddingRight: 20,
	},
    prozor: {
        marginBottom: 40,
    }
})