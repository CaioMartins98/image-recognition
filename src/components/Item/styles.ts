import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    backgroundColor: "#F1F1F1",
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  percentage: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    backgroundColor: "#602eeb",
    height: 42,
    width: 66,
    padding: 5,
    borderRadius: 8,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
  },
});
