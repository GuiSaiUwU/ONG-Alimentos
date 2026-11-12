import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#676767",
  },
  keyboardView: {
    flex: 1,
  },
  button: {
    marginTop: 4,
    borderRadius: 8,
    backgroundColor: "#5c9dda",
    padding: 12,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 14,
  },
  flatList: {
    flex: 1,
    backgroundColor: "#676767",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#fff",
    color: "#000000",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    minHeight: 44,
  },
  container: {
    padding: 16,
    backgroundColor: "#fff",
    gap: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pontoItem: {
    borderWidth: 1,
    borderColor: "#827d7d",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    minHeight: 44,
  },
  pontoNome: {
    fontSize: 16,
    fontWeight: "600",
  },
  pontoEndereco: {
    marginTop: 4,
    color: "#444",
  },
  textErro: {
    color: "#e53e3e",
    fontSize: 14,
    alignSelf: "center",
  },
  textSucesso: {
    color: "#38a169",
    fontSize: 14,
    alignSelf: "center",
  },
  linha: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
  },
});
