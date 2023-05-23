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

const MusicRoute = () => <Text>Musiiic</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

function App(): JSX.Element {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: 'music',
      title: 'Favorites',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {key: 'albums', title: 'Albums', focusedIcon: 'album'},
    {key: 'recents', title: 'Recents', focusedIcon: 'history'},
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ]);

  const renderScene = Screens.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
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
