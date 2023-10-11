import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import {
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  PermissionStatus,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { styles } from "./stylesDashboard";
import { Button } from "@/components/Button";
import { Tip } from "@/components/Tip";
import { Item } from "@/components/Item";
import { useFonts } from "expo-font";
import { api } from "@/services/api";
import { getLocales } from "expo-localization";

const Home = () => {
  const [selectedImageUri, setSelectedImageUri] = useState<string>("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    Poppins_700Regular: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const deviceLanguage = getLocales()[0].languageCode;
  async function handleOpenCamera() {
    try {
      const { status } = await requestCameraPermissionsAsync();
      if (status !== PermissionStatus.GRANTED) {
        return Alert.alert("É necessário concender permissão.");
      }
      setIsLoading(true);
      const response = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (response.canceled) {
        return setIsLoading(false);
      }
      if (!response.canceled) {
        const imgManipuled = await manipulateAsync(
          response.assets[0].uri,
          [{ resize: { width: 900 } }],
          {
            compress: 1,
            format: SaveFormat.JPEG,
            base64: true,
          }
        );
        setSelectedImageUri(imgManipuled.uri);
        imageDetect(imgManipuled.base64);
      }
    } catch (error) {
      console.error(error);
    } finally {
      return setIsLoading(false);
    }
  }
  async function handleSelectImage() {
    try {
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== PermissionStatus.GRANTED) {
        return Alert.alert("É necessário concender permissão.");
      }
      setIsLoading(true);
      const response = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (response.canceled) {
        return setIsLoading(false);
      }
      if (!response.canceled) {
        const imgManipuled = await manipulateAsync(
          response.assets[0].uri,
          [{ resize: { width: 900 } }],
          {
            compress: 1,
            format: SaveFormat.JPEG,
            base64: true,
          }
        );
        setSelectedImageUri(imgManipuled.uri);
        imageDetect(imgManipuled.base64);
      }
    } catch (error) {
      console.error(error);
    } finally {
      return setIsLoading(false);
    }
  }

  async function imageDetect(imageBase64: string | undefined) {
    const response = await api.post(
      `/v2/models/${process.env.EXPO_PUBLIC_API_MODEL_ID}/versions/${process.env.EXPO_PUBLIC_API_MODEL_VERSION_ID}/outputs`,
      {
        user_app_id: {
          user_id: process.env.EXPO_PUBLIC_API_USER_ID,
          app_id: process.env.EXPO_PUBLIC_API_APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                base64: imageBase64,
              },
            },
          },
        ],
      }
    );

    setData(response.data.outputs[0].data.concepts);
    return setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleOpenCamera} disabled={isLoading} />

      {selectedImageUri ? (
        <Image
          source={{ uri: selectedImageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.description}>Insira a foto para analise.</Text>
      )}

      <View
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          paddingHorizontal: 24,
          marginTop: -42,
          paddingTop: 12,
          height: data.length === 0 ? 90 : 400,
        }}
      >
        <Tip handleSelectImage={handleSelectImage} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 24 }}
        >
          <View style={styles.items}>
            <Item data={data} isLoading={isLoading} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default Home;
