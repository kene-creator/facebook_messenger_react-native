/* eslint-disable react/react-in-jsx-scope */
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Avatar} from 'react-native-paper';

function ChatsScreen() {
  const friends = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Doe'},
    {id: 3, name: 'Jane'},
  ];

  return (
    <View style={styles.container}>
      {friends.map(friend => (
        <Pressable key={friend.id} onPress={() => {}}>
          <View style={styles.friends}>
            <Avatar.Image
              size={72}
              style={styles.profilePicture}
              source={{
                uri: `https://randomuser.me/api/portraits/men/${friend.id}.jpg`,
              }}
            />
            <View>
              <Text>{friend.name}</Text>
              <Text>This was the last message | Sun</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  friends: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePicture: {
    marginRight: 8,
  },
});

export default ChatsScreen;
