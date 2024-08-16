import { View, Text, Image, StyleSheet } from "react-native";
export default function User({username}) {
  return(
    <View style={styles.userContainer}>
      <Image
        source={`https://ui-avatars.com/api/?name=${username}&background=random`}
        style={styles.profileImage}
      />
      <Text style={styles.username}>{username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 18
  }
});