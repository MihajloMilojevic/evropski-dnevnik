import React, {useRef} from "react";
import { View, Animated, StyleSheet, PanResponder, useWindowDimensions, Button } from "react-native";
import MithCard from "../utils/mithCard";

export default function Miths()
{
	const dimensions = useWindowDimensions();
	const translate = useRef(new Animated.Value(0)).current;

	
	const panResponder = useRef(
		PanResponder.create({
		  onStartShouldSetPanResponder: (evt, gestureState) => true,
		  onPanResponderMove: (evt, gestureState) => {
			translate.setValue(gestureState.dx);
		  },
		  onPanResponderRelease: (evt, gestureState) => {
				if(Math.abs(gestureState.dx) <= (dimensions.width * 0.25)) //
				{
					Animated.spring(translate, {
						toValue: 0,
						useNativeDriver: true
					}).start();
				}
				else if(gestureState.dx < 0)
				{
					Animated.timing(translate, {
						toValue: -dimensions.width,
						useNativeDriver: true
					}).start();
				}
				else
				{
					Animated.timing(translate, {
						toValue: dimensions.width,
						useNativeDriver: true
					}).start();
				}
		  }
		})
	  ).current;
	
	const styles = StyleSheet.create({
		container: {
			display: "flex",
			flexGrow: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "dodgerblue",
		},
		card: {
			transform: [
				{translateX: translate},
				{rotate: translate.interpolate({
					inputRange: [-dimensions.width / 2, 0, dimensions.width / 2],
					outputRange: ["-15deg", "0deg", "15deg"],
					extrapolate: "clamp"
				})}
			]
		}
	})

	return (
		<View style={styles.container}>
			<Animated.View 
				{...panResponder.panHandlers}
				style={styles.card}
			>
				<MithCard/>
			</Animated.View>
			<Button
				title="Reset"
				color="orange"
				onPress={()=> {Animated.spring(translate, {
					toValue: 0,
					useNativeDriver: true
				}).start();
			}}
			/>
		</View>
	)
}