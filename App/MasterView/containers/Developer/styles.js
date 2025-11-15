import { getColor } from "@styles/helper";
import { StyleSheet } from "react-native";

export default ({} = {}) => {
  return StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      backgroundColor: getColor("background"),
      padding: 20,
    },
    header: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    backIcon: {
      position: "absolute",
      left: 0,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#2196F3",
    },
    scrollContent: {
      flex: 1,
    },
    content: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      paddingBottom: 40,
    },
    warning: {
      width: "100%",
      padding: 15,
      backgroundColor: "#FFF3CD",
      borderRadius: 8,
      borderWidth: 2,
      borderColor: "#FFC107",
      marginBottom: 20,
    },
    warningText: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      color: "#856404",
    },
    section: {
      width: "100%",
      marginBottom: 25,
      padding: 20,
      backgroundColor: getColor("light"),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: getColor("light", "dark"),
    },
    sectionHeader: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "right",
      marginBottom: 15,
      color: getColor("primary", "contrast"),
    },
    toggleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom: 15,
    },
    toggleLabel: {
      fontSize: 18,
      marginRight: 10,
      color: getColor("background", "contrast"),
    },
    inputGroup: {
      width: "100%",
      marginBottom: 15,
    },
    inputLabel: {
      fontSize: 16,
      textAlign: "right",
      marginBottom: 8,
      color: getColor("background", "contrast"),
    },
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: getColor("light", "dark"),
      borderRadius: 8,
      padding: 12,
      fontSize: 18,
      backgroundColor: "#FFFFFF",
      textAlign: "right",
    },
    infoText: {
      fontSize: 14,
      textAlign: "right",
      color: getColor("background", "contrast"),
      opacity: 0.7,
      marginBottom: 8,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      paddingHorizontal: 10,
    },
    infoLabel: {
      fontSize: 16,
      color: getColor("background", "contrast"),
      fontWeight: "600",
    },
    infoValue: {
      fontSize: 16,
      color: getColor("primary", "contrast"),
    },
    timeRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    actionButton: {
      width: "100%",
      paddingVertical: 15,
      backgroundColor: "#2196F3",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,
    },
    actionButtonSecondary: {
      backgroundColor: getColor("secondary", "main") || "#FF9800",
    },
    actionButtonDanger: {
      backgroundColor: "#F44336",
    },
    actionButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
  });
};
