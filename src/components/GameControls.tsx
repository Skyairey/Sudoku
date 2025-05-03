import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useFonts, LilitaOne_400Regular } from "@expo-google-fonts/lilita-one";

interface GameControlsProps {
  onHint: () => void;
  onReset: () => void;
  onChangeDifficulty: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  onHint,
  onReset,
  onChangeDifficulty,
}) => {
  let [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onHint}>
        <Text style={styles.text}>Hint</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text style={styles.text}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onChangeDifficulty}>
        <Text style={styles.text}>Change Difficulty</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f4f4f4", // Light gray for a modern look
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    color: "#333", // Dark gray for professional look
    fontWeight: "500",
    fontFamily: "LilitaOne_400Regular",
  },
});

export default GameControls;
