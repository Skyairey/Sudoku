import AsyncStorage from "@react-native-async-storage/async-storage";

const BEST_TIME_KEY = "SUDOKU_BEST_TIME";

export const saveBestTime = async (difficulty: string, time: number) => {
  try {
    const existingData = await AsyncStorage.getItem(BEST_TIME_KEY);
    const bestTimes = existingData ? JSON.parse(existingData) : {};

    if (!bestTimes[difficulty] || time < bestTimes[difficulty]) {
      bestTimes[difficulty] = time;
      await AsyncStorage.setItem(BEST_TIME_KEY, JSON.stringify(bestTimes));
    }
  } catch (err) {
    console.error("Error saving best time:", err);
  }
};

export const getBestTimes = async (): Promise<Record<string, number>> => {
  try {
    const data = await AsyncStorage.getItem(BEST_TIME_KEY);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.error("Error loading best times:", err);
    return {};
  }
};

const GAME_STATE_KEY = "SAVED_SUDOKU_GAME";

export const saveGameState = async (gameState: any) => {
  await AsyncStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
};

export const getSavedGameState = async () => {
  const state = await AsyncStorage.getItem(GAME_STATE_KEY);
  return state ? JSON.parse(state) : null;
};

export const clearGameState = async () => {
  await AsyncStorage.removeItem(GAME_STATE_KEY);
};
