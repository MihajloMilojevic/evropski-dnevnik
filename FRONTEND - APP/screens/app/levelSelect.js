import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import CircleList from "react-native-circle-list"
import { useSelector } from "react-redux";
import LevelSelectItem from "../../components/levelSelectItem";
import pozadina from "../../assets/pozadine/mithsBcg.png";
import MessageModal from "../../components/messageModal";
import LoadingModal from "../../components/loadingModal";

export default function LevelSelect({navigation}) {

	const circleRef = useRef(null)
	const user = useSelector(state => state.user);
	const [mounted, setMounted] = useState(false)
	const [loading, setLoading] = useState(false)
	const [modal, setModal] = useState({
		show: false,
		title: "",
		message: "",
		onPress: () => {}
	})

	const keyExtractor = () => (Math.random() * 1000).toString(36);
    const renderItem = ({ item }) => <LevelSelectItem 
										navigation={navigation} 
										item={item} 
										level={item.value}
										setModal={setModal}
										setLoading={setLoading}
									/>
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

	useEffect(() => {
		if(!circleRef || !mounted) return;
		circleRef.current.scrollToIndex(user.level - 1, 250);
	}, [mounted])

	useEffect(() => {
		setMounted(true)
	}, []);

	return (
		<ImageBackground style={styles.container} source={pozadina} resizeMode={"cover"}>
			<MessageModal title={modal.title} message={modal.message} showModal={modal.show} onPress={modal.onPress}/>
			<LoadingModal showModal={loading}/>
            <CircleList
			  	ref={circleRef}
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                visiblityPadding={1}
                elementCount={data.length}
            />
		</ImageBackground>
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
  