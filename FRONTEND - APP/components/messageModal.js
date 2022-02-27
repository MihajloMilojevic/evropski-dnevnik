import { Modal, Text } from "react-native";
import CustomButton from "./customButton";

export default function MessageModal({title, message, onPress, showModal}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => { }}
        >
            <Text>{title}</Text>
            <Text>{message}</Text>
            <CustomButton onPress={onPress}/>
        </Modal>
    );
}