import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

interface NumberPadProps {
  onNumberPress: (num: number) => void;
  numbers: number[];
}

const screenWidth = Dimensions.get("window").width;
const buttonSize = screenWidth / 10; // Adjust for better spacing

const NumberPad: React.FC<NumberPadProps> = ({ onNumberPress, numbers }) => {
  return (
    <View style={styles.numberPad}>
      {numbers.map((num) => (
        <TouchableOpacity
          key={num}
          style={styles.numberButton}
          onPress={() => onNumberPress(num)}
        >
          <Text style={styles.numberText}>{num}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  numberPad: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap", // Allow wrapping if needed
    gap: 12, // Ensures equal spacing between buttons
    marginTop: 20,
  },
  numberButton: {
    width: buttonSize,
    height: buttonSize,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
  },
  numberText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});

export default NumberPad;
