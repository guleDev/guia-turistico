import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ecf0f1",
    textAlign: "center",
    marginVertical: 20,
    marginBottom: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#bdc3c7",
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#e74c3c",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#bdc3c7",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 22,
  },
});