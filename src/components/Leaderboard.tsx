import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface LeaderboardProps {
  data: { player: string; time: string }[];
  onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data, onClose }) => {
  return (
    <View style={styles.leaderboardModal}>
      <Text style={styles.modalTitle}>Leaderboard</Text>
      <View style={{ marginVertical: 20 }}>
        {data.map((item, index) => (
          <View key={index} style={styles.leaderboardItem}>
            <Text style={styles.leaderboardPlayer}>{item.player}</Text>
            <Text style={styles.leaderboardTime}>{item.time}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 16, color: "#007bff" }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  leaderboardModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
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

export default Leaderboard;
