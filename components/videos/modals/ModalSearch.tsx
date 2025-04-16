import { globalStyles } from "@/utils/styles";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";

type ModalSearchProps = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalSearch({ visible, onClose }: ModalSearchProps) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <View style={globalStyles.container}>
        <TextInput autoFocus />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
