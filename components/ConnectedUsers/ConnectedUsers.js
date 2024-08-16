import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import User from './User';

export default function ConnectedUsers({Users}) {
  return(
    <View style={styles.container}>
      <Text style={styles.header}>Connected Users</Text>
      <FlatList 
        data={Users}
        keyExtractor={(item) => item.id}
        renderIterm={({item}) => <User username={item.username}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  }
})