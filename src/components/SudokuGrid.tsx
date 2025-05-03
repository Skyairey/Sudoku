import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CONSTANT } from "../utils/constants";

interface SudokuGridProps {
  puzzle: number[][];
  selectedCell: { row: number; col: number } | null;
  onCellPress: (row: number, col: number) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({
  puzzle,
  selectedCell,
  onCellPress,
}) => {
  return (
    <View style={styles.grid}>
      {puzzle.map((row, rIdx) => (
        <View key={rIdx} style={styles.row}>
          {row.map((num, cIdx) => (
            <TouchableOpacity
              key={cIdx}
              style={[
                styles.cell,
                selectedCell?.row === rIdx && selectedCell?.col === cIdx
                  ? styles.selectedCell
                  : null,
              ]}
              onPress={() => onCellPress(rIdx, cIdx)}
            >
              <Text style={styles.cellText}>
                {num !== CONSTANT.UNASSIGNED ? num : ""}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#ffffff",
    padding: 3,
    borderRadius: 8,
  },
  row: { 
    flexDirection: "row" 
  },
  cell: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
    margin: 1,
    borderRadius: 3,
  },
  selectedCell: {
    backgroundColor: "#add8e6",
  },
  cellText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SudokuGrid;
