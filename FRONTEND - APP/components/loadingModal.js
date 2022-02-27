import { Modal, StyleSheet, View, Image, ImageBackground } from "react-native";
import Loading from "../assets/slike/Loading.gif"

export default function LoadingModal({showModal}) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => { }}
        >
            <View style={styles.centeredView}>
				<ImageBackground
					source={Loading}
					style={{
						width: 75,
						height: 75
					}}
				/>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: "transparent",
        alignItems: "center",
        /*borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,*/
      },
})