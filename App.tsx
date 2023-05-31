import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AuthProvider} from './src/shared/auth/contexts/auth.context';
import {FriendProvider} from './src/shared/friends/contexts/friend.context';

import Screens from './src/screens';

function App(): JSX.Element {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <FriendProvider>
          <SafeAreaProvider>
            <PaperProvider>
              <Screens />
            </PaperProvider>
          </SafeAreaProvider>
        </FriendProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
