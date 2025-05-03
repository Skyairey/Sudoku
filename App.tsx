import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DifficultyScreen from "./src/components/DifficultyScreen";
import GameScreen from "./src/components/GameScreen";


const App: React.FC = () => {
  return (
    <GameScreen/>
  );
};

export default App;
