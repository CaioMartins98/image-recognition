import { View, Text } from "react-native";
import React from "react";

type Props = {
  title: string;
};

const HeaderApp = ({ title }: Props) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#111",
        height: 80,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 28 }}>{title}</Text>
    </View>
  );
};

export default HeaderApp;
