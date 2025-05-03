import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  StatusBar,
  Image,
} from "react-native";
import { useFonts, LilitaOne_400Regular } from "@expo-google-fonts/lilita-one";
import * as SplashScreen from "expo-splash-screen";
import { CONSTANT } from "../utils/constants";
import Leaderboard from "./Leaderboard";

interface Props {
  onSelectDifficulty: (difficulty: string) => void;
}

SplashScreen.preventAutoHideAsync();

const DifficultySelection: React.FC<Props> = ({ onSelectDifficulty }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(500))[0];

  const dummyLeaderboardData = [
    { player: "Player 1 (Easy)", time: "2:00" },
    { player: "Player 2 (Medium)", time: "5:00" },
    { player: "Player 3 (Hard)", time: "10:00" },
  ];

  let [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <View style={styles.header}>
        <Text style={styles.sudokuTitle}>Sudoku</Text>
        <Image
          source={require("../../assets/images/Sudoku.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Centered Buttons */}
      <View style={styles.centerContainer}>
        <TouchableOpacity
          style={styles.leaderboardButton}
          onPress={() => setLeaderboardVisible(true)}
        >
          <Text style={styles.leaderboardText}>Leaderboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.newGameButton} onPress={openModal}>
          <Text style={styles.newGameText}>New Game</Text>
        </TouchableOpacity>
      </View>

      {/* Difficulty Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay} onTouchStart={closeModal}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.modalTitle}>Select Difficulty</Text>
            <View style={styles.buttonContainer}>
              {CONSTANT.LEVEL_NAME.map((level, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() => {
                    onSelectDifficulty(level);
                    closeModal();
                  }}
                >
                  <Text style={styles.buttonText}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Leaderboard Modal */}
      <Modal visible={leaderboardVisible} animationType="slide">
        <Leaderboard
          data={dummyLeaderboardData}
          onClose={() => setLeaderboardVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
  },
  sudokuTitle: {
    fontSize: 55,
    fontFamily: "LilitaOne_400Regular",
    color: "#333",
    marginBottom: 10,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: -150,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  newGameButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    borderColor: "#007bff",
    borderWidth: 1,
    marginTop: 20,
  },
  newGameText: {
    color: "#007bff",
    fontSize: 20,
    fontWeight: "bold",
  },
  leaderboardButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  leaderboardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "70%",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  leaderboardModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  leaderboardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    alignSelf: "center",
  },
  leaderboardPlayer: {
    fontSize: 16,
    color: "#333",
  },
  leaderboardTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  closeButton: {
    marginTop: 20,
  },
});

export default DifficultySelection;
