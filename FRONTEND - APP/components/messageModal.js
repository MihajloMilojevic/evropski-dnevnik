import { Modal, Text, StyleSheet, View, useWindowDimensions } from "react-native";
import CustomButton from "./customButton";

export default function MessageModal({title, message, onPress, showModal}) {
    const { height, width } = useWindowDimensions();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => { }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.hairline} />
                    <Text style={styles.text}>{message}</Text>
                    <CustomButton 
                      title={"OK"} 
                      onPress={onPress} 
                      containerStyle={styles.button}
                      textStyle={{textAlign: "center"}}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    text: {
      fontSize: 14    
    },
    hairline: {
        backgroundColor: '#3268B8',
        height: 2,
        width: 200,
        marginVertical: 10
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 20,
        marginTop: 50,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 100,
        marginTop: 20
      },
})