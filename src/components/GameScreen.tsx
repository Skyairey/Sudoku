import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import SudokuGrid from "../components/SudokuGrid";
import NumberPad from "../components/NumberPad";
import GameControls from "../components/GameControls";
import { sudokuGen, isSafe } from "../utils/sudoku";
import { CONSTANT } from "../utils/constants";
import DifficultySelection from "./DifficultyScreen";
import { Ionicons } from "@expo/vector-icons";
import { saveBestTime } from "../utils/storage";
import { saveGameState, clearGameState } from "../utils/storage";

const GameScreen: React.FC = () => {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [puzzleData, setPuzzleData] = useState<{
    question: number[][];
    original: number[][];
  } | null>(null);
  const [puzzle, setPuzzle] = useState<number[][] | null>(null);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [time, setTime] = useState(0);
  const [moveCount, setMoveCount] = useState(0); // New state for move count

  useEffect(() => {
    let timer: number;
    if (difficulty) {
      setTime(0);
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [difficulty]);

  useEffect(() => {
    return () => {
      if (puzzle && puzzleData && difficulty) {
        const stateToSave = {
          puzzle,
          puzzleData,
          difficulty,
          time,
          moveCount,
          selectedCell,
        };
        saveGameState(stateToSave);
      }
    };
  }, [puzzle, puzzleData, difficulty, time, moveCount, selectedCell]);

  const startGame = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);

    const index = CONSTANT.LEVEL_NAME.indexOf(selectedDifficulty);
    if (index === -1) return;
    const numClues = CONSTANT.LEVEL[index];

    const newPuzzleData = sudokuGen(numClues) || { question: [], original: [] };
    setPuzzleData(newPuzzleData);
    setPuzzle(newPuzzleData.question);
    setSelectedCell(null);
    setTime(0);
    setMoveCount(0); // Reset move count on new game
  };

  const handleCellPress = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const isPuzzleComplete = (grid: number[][]): boolean => {
    return grid.every((row) =>
      row.every((cell) => cell !== CONSTANT.UNASSIGNED)
    );
  };

  const handleNumberPress = (num: number) => {
    if (!selectedCell || !puzzle) return;
    const { row, col } = selectedCell;
    if (puzzle[row][col] === CONSTANT.UNASSIGNED) {
      let newPuzzle = [...puzzle];
      if (isSafe(newPuzzle, row, col, num)) {
        newPuzzle[row][col] = num;
        setPuzzle(newPuzzle);
        setMoveCount((prev) => prev + 1); // Increase move count on valid move
      }
      if (isPuzzleComplete(newPuzzle)) {
        if (difficulty !== null) {
          saveBestTime(difficulty, time);
        }
      }
    }
  };

  const handleHint = () => {
    if (!selectedCell || !puzzleData) return;
    const { row, col } = selectedCell;
    if (puzzle && puzzle[row][col] === CONSTANT.UNASSIGNED) {
      let newPuzzle = [...puzzle];
      newPuzzle[row][col] = puzzleData.original[row][col];
      setPuzzle(newPuzzle);
    }
  };

  const handleReset = () => {
    if (!difficulty) return;
    startGame(difficulty);
  };

  const handleChangeDifficulty = () => {
    setDifficulty(null);
    setPuzzleData(null);
    setPuzzle(null);
    setSelectedCell(null);
    setTime(0);
    setMoveCount(0); // Reset move count when changing difficulty
  };

  if (!difficulty) {
    return <DifficultySelection onSelectDifficulty={startGame} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />

      {/* Header with Difficulty, Timer, and Move Count */}
      <View style={styles.header}>
        <Text style={styles.difficultyText}>Difficulty: {difficulty}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={22} color="#ff4500" />
            <Text style={styles.timerText}>
              {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
            </Text>
          </View>
          <View style={styles.moveCounter}>
            <Ionicons name="walk-outline" size={22} color="#1e90ff" />
            <Text style={styles.timerText}>{moveCount}</Text>
          </View>
        </View>
      </View>

      {/* Sudoku Grid */}
      <SudokuGrid
        puzzle={puzzle || [[]]}
        selectedCell={selectedCell}
        onCellPress={handleCellPress}
      />

      {/* Number Pad */}
      <NumberPad onNumberPress={handleNumberPress} numbers={CONSTANT.NUMBERS} />

      {/* Controls: Hint, Reset, Change Difficulty */}
      <GameControls
        onHint={handleHint}
        onReset={handleReset}
        onChangeDifficulty={handleChangeDifficulty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  difficultyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  moveCounter: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    fontSize: 18,
    color: "#333",
    marginLeft: 5,
  },
});

export default GameScreen;
