import React from "react";
import {Text, StyleSheet, View} from "react-native";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

export default function CollapseUputstvo({title, tekst})
{
    return (
        <Collapse style={styles.prozor}>
			<CollapseHeader>
			<View style={styles.header}>
				<Text style={styles.naslov}>{title}</Text>
			</View>
			</CollapseHeader>
			<View style={styles.hairline} />
			<CollapseBody>
				<View style={styles.hairline} />
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
        paddingLeft: 5,
        paddingRight: 5,
		lineHeight: 19
	},
    prozor: {
        margin: 0,
		width: "80%",
		paddingTop: 10,
		paddingBottom: 10,
    },
	hairline: {
        backgroundColor: '#3268B8',
        height: 1,
        width: "100%",
		margin: 0
    },
})