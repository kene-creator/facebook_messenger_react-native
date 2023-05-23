/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  BottomNavigation as Screens,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';
import ChatsScreen from './src/screens/chats';

const chatscreens = () => <ChatsScreen />;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

interface NavRoutes {
  key: string;
  title: string;
  focusedIcon: string;
}

function App(): JSX.Element {
  const [index, setIndex] = useState(0);

  const [routes] = useState<NavRoutes[]>([
    {
      key: 'chat',
      title: 'Chats',
      focusedIcon: 'chat',
    },
    {key: 'calls', title: 'Calls', focusedIcon: 'video'},
    {key: 'people', title: 'People', focusedIcon: 'account'},
    {key: 'stories', title: 'Stroies', focusedIcon: 'book'},
  ]);

  const renderScene = Screens.SceneMap({
    chat: chatscreens,
    calls: AlbumsRoute,
    people: RecentsRoute,
    stories: NotificationsRoute,
  });

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Screens
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
