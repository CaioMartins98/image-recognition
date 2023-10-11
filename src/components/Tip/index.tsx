import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { TouchableOpacity } from "react-native";
type Props = {
  handleSelectImage: () => void;
};

export function Tip({ handleSelectImage }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={handleSelectImage}>
      <MaterialIcons
        name="add-a-photo"
        color="#FFF"
        size={24}
        style={{ marginBottom: 6 }}
      />

      <Text style={styles.message}>Escolher imagem</Text>
    </TouchableOpacity>
  );
}
