import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111"
  },
  description: {
    color: "#FFF",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    fontSize: 14,
    flex: 1,
    textAlignVertical: "center"
  },
  content: {
    flex: 1,
  },
  bottom: {
    // flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    marginTop: -42,
    paddingTop: 12,
  },
  items: {
    flex: 1,
    gap: 12,
    display:'flex',
    flexDirection:'column',
  },
  image: {
    flex: 1
  },
});