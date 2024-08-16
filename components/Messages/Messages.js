import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Message from "./Message";
import AudioRecorder from "../AudioRecorder/AudioRecorder";
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function Messages({
  message,
  messages,
  handleSendMessage,
  setMessage,
  username,
}) {
  return (
    <View style={styles.container}>
      {messages && (
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString() + item.username}
          renderItem={({ item }) => (
            <Message
              message={item.sendMessage}
              username={item.username}
              userSend={username}
              src={item.src}
              voice_message={item.voice_message}
              ownSound={item?.sound}
            />
          )}
        />
      )}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={() => handleSendMessage()}
          style={{
            borderWidth: 1,
            borderColor: '#000',
            padding: 10,
            borderRadius: 99,
            backgroundColor: 'red'
          }}
        >
          <FontAwesome name="send" size={24} color="white" />
        </TouchableOpacity>
        <AudioRecorder
        handleSendMessage={handleSendMessage}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 26,
    backgroundColor: "#fff",
  },
  form: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    gap: 5,
    width: '100%'
  },
  input: {
    height: 40,
    width: 280,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15
  },
});
