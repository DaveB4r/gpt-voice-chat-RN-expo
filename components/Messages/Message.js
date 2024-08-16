import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

export default function Message({
  id,
  message,
  username,
  userSend,
  src,
  voice_message,
  ownSound,
}) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (voice_message && !ownSound && src) {
      playAudio();
    }
  }, []);

  const whoSend = username !== userSend;
  const now = new Date().toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const playAudio = async () => {
    const url = src.replace("http://localhost:3000", process.env.EXPO_PUBLIC_API_URL);
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);

      // You can handle the playback status if needed
      sound?.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          // setSound(null);
        }
      });

      await newSound.playAsync();
    } catch (error) {
      console.error("Error loading or playing audio", error);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      // setSound(null);
      setIsPlaying(false);
    }
  };

  return (
    <View
      key={id}
      style={whoSend ? styles.messageContainer : styles.incomingContainer}
    >
      <View style={styles.usernameContainer}>
        <Text style={whoSend ? styles.username : styles.sended}>
          {whoSend ? username : "sended"}
        </Text>
      </View>
      {voice_message && ownSound ? (
        <TouchableOpacity onPress={() => ownSound.replayAsync()}>
          <AntDesign name="play" size={40} color="white" />
        </TouchableOpacity>
      ) : (
        voice_message &&
        !ownSound &&
        src && (
          <TouchableOpacity onPress={isPlaying ? stopAudio : playAudio}>
            {isPlaying ? (
              <Entypo name="controller-stop" size={40} color="black" />
            ) : (
              <AntDesign name="play" size={40} color="black" />
            )}
          </TouchableOpacity>
        )
      )}
      <Text style={whoSend ? styles.message : styles.messageincoming}>
        {message}
      </Text>
      <Text style={styles.timestamp}>{now.toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    width: "85%",
    alignSelf: "flex-start",
  },
  incomingContainer: {
    padding: 10,
    marginVertical: 5,
    width: "85%",
    backgroundColor: "#ff0000",
    borderRadius: 15,
    alignSelf: "flex-end",
  },
  usernameContainer: {
    marginBottom: 5,
  },
  username: {
    fontWeight: "bold",
  },
  sended: {
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "flex-end",
  },
  message: {
    marginBottom: 5,
  },
  messageincoming: {
    marginBottom: 5,
    color: "#fff",
  },
  timestamp: {
    fontSize: 10,
    color: "gray",
  },
});
