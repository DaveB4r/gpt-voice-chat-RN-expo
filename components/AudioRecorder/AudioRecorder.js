import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AudioRecorder = ({ handleSendMessage }) => {
  const [recording, setRecording] = useState();
  // const [recordings, setRecordings] = useState([]);

  const startRecording = async () => {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { ios, android } = Audio.RecordingOptionsPresets.HIGH_QUALITY;
        const { recording } = await Audio.Recording.createAsync({
          android: {
            ...android,
            extension: ".mp4",
          },
          ios: { ...ios, extension: ".mp4" },
        });
        setRecording(recording);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    // let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    // allRecordings.push({
    //   sound: sound,
    //   duration: getDurationFormatted(status.durationMillis),
    //   file: recording.getURI(),
    // });
    const req = await fetch(recording.getURI());
    const blob = await req.blob();
    handleSendMessage(blob, sound);
    // setRecordings(allRecordings);
  };

  const getDurationFormatted = (milliseconds) => {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  };

  // const getRecordingLines = () => {
  //   return recordings.map((recordingLine, index) => {
  //     return (
  //       <View key={index}>
  //         <Text>
  //           Recording #{index + 1} | {recordingLine.duration}
  //         </Text>
  //         <TouchableOpacity onPress={() => recordingLine.sound.replayAsync()}>
  //           <Text>Play</Text>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   });
  // };

  // const clearRecordings = () => {
  //   setRecordings([]);
  // };

  return (
    <View>
      <TouchableOpacity onPress={recording ? stopRecording : startRecording}
        style={{
          borderWidth: 1,
          borderColor: '#000',
          padding: 10,
          borderRadius: 99,
          backgroundColor: 'red'
        }}
      >
        <Text>{recording ? <FontAwesome name="microphone-slash" size={24} color="white" /> : <FontAwesome name="microphone" size={24} color="white" />}</Text>
      </TouchableOpacity>
      {/* {getRecordingLines()}
      <TouchableOpacity onPress={clearRecordings}>
        <Text>{recordings.length > 0 ? "\n\n\nClear Recordings" : ""}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default AudioRecorder;
