import { Pressable, Text, View } from "react-native";

function Answer({onPress, text, style, textStyle}) {
	return (
		<Pressable
			onPress={onPress}
			style={style}
		>
			<View>
				<Text style={textStyle}>{text}</Text>
			</View>
		</Pressable>
	);
}

export default Answer;