import { Text, View } from "react-native";
import { Skeleton } from "@rneui/themed";
import { styles } from "./styles";
import { useFonts } from "expo-font";

export type ItemProps = {
  name: string;
  value: string;
};

type Props = {
  data: ItemProps[];
  isLoading: boolean;
};

export function Item({ data, isLoading }: Props) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular: require("../../../assets/fonts/Poppins-Regular.ttf"),
    Poppins_700Bold: require("../../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  function decimalToPercentage(numberString: string) {
    const number = parseFloat(numberString);
    const percentage = (number * 100).toFixed(2);
    return `${percentage}%`;
  }

  return (
    <>
      {data.map((item) => (
        <>
          {isLoading ? (
            <>
              <Skeleton
                width={"100%"}
                height={56}
                skeletonStyle={{ borderRadius: 8, zIndex: 0 }}
              />
              <Skeleton
                width={"100%"}
                height={56}
                skeletonStyle={{ borderRadius: 8, zIndex: 0 }}
              />
              <Skeleton
                width={"100%"}
                height={56}
                skeletonStyle={{ borderRadius: 8, zIndex: 0 }}
              />
              <Skeleton
                width={"100%"}
                height={56}
                skeletonStyle={{ borderRadius: 8, zIndex: 0 }}
              />
              <Skeleton
                width={"100%"}
                height={56}
                skeletonStyle={{ borderRadius: 8, zIndex: 0 }}
              />
            </>
          ) : (
            <View key={item.name} style={styles.container}>
              <Text style={styles.percentage}>
                {decimalToPercentage(item.value)}
              </Text>

              <Text style={styles.title}>{item.name}</Text>
            </View>
          )}
        </>
      ))}
    </>
  );
}
