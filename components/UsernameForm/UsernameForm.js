import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function UsernameForm({
  username,
  setUsername,
  handleConnection,
}) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="Enter your username"
        onChangeText={setUsername}
        required
      />
      <TouchableOpacity onPress={handleConnection}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
});
