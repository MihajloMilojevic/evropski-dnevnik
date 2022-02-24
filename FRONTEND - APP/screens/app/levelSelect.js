import { View, StyleSheet } from "react-native";
import CircleList from "react-native-circle-list"
import LevelSelectItem from "../../components/levelSelectItem"

export default function LevelSelect({navigation}) {
	const keyExtractor = () => (Math.random() * 1000).toString(36);
    const renderItem = ({ item }) => <LevelSelectItem navigation={navigation} item={item} />
	const data = [
		{ value: 1},
		{ value: 2},
		{ value: 3},
		{ value: 4},
		{ value: 5},
		{ value: 6},
		{ value: 7},
		{ value: 8},
		{ value: 9},
		{ value: 10},
		{ value: 11},
		{ value: 12},
	]

	return (
		<View style={styles.container}>
              <CircleList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                visiblityPadding={1}
                elementCount={data.length}
            />
        </View>
	);
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	}
});
  