import { Modal, Text, StyleSheet, View, useWindowDimensions, Image, ImageBackground, ScrollView } from "react-native";
import CustomButton from "./customButton";
import trophy from "../assets/slike/trophy.png"

export default function VictoryModal({title, messages, scrollMessage, onPress, showModal}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => { }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <ImageBackground
                    source={trophy}
                    style={styles.trophy}
                    resizeMode={"contain"}
                  />
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.hairline} />
                    {
                      messages.map((message, ind) => <Text key={ind} style={styles.text}>{message}</Text>)
                    }
                    {
                      scrollMessage ?
                      <ScrollView style={styles.scroll}>
                        <Text style={styles.text}>{scrollMessage}</Text>
                      </ScrollView>
                      :
                      null
                    }
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
    scroll: {
      maxHeight: 150,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    text: {
      fontSize: 16,
      marginBottom: 10   
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
        paddingTop: 150,
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
      trophy: {
        height: 300,
        width: 200,
        position: "absolute",
        top: -125,
        zIndex: 200
      }
})