import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import SocketIOClient from 'socket.io-client';

import {AuthContext} from '../../auth/contexts/auth.context';
import {Platform} from 'react-native';
import {ActiveFriend} from '../models';
import {useQuery} from 'react-query';
import {getFriendRequests} from '../../../screens/people/request';
import getFriends from '../helpers/friends';
import {UserDetails} from '../../auth/models';

export interface IFriendsContext {
  friends: ActiveFriend[];
  isLoading: boolean;
  // setFriend: (friend: ActiveFriend) => void;
}

export const FriendsContext = createContext<IFriendsContext>({
  friends: [],
  //   friend: {} as ActiveFriend,
  isLoading: false,
  //   conversations: [],
  //   messages: [],
  //   callDetails: null,
  //   callActivity: CallActivity.None,
  //   sendMessage: () => null,
  // setFriend: () => null,
  //   setCallDetails: () => null,
  //   setCallActivity: () => null,
  //   startCall: () => null,
  //   respondToCall: () => null,
});

export const FriendProvider = ({children}: {children: ReactNode}) => {
  const {isActive, jwt, isLoggedIn, userDetails} = useContext(AuthContext);

  const [friends, setFriends] = useState<ActiveFriend[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useQuery(
    'friendRequests',
    async () => {
      setIsLoading(true);

      const friendRequest = await getFriendRequests();

      const _friends = getFriends(
        friendRequest,
        (userDetails as UserDetails).id,
      );

      const activeFriends: ActiveFriend[] = _friends.map(f => ({
        ...f,
        isActive: false,
      }));

      setFriends(activeFriends);

      return _friends;
    },
    {
      enabled: isLoggedIn,
      onSettled: () => {
        setIsLoading(false);
      },
    },
  );

  const baseURL =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:6000'
      : 'http://localhost:6000';

  const socket = useMemo(
    () =>
      SocketIOClient(baseURL, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: jwt,
            },
          },
        },
      }),
    [jwt, baseURL],
  );

  useEffect(() => {
    socket.emit('updateActiveStatus', isActive);

    socket.on(
      'friendActive',
      ({id, isActive: isFriendActive}: {id: number; isActive: boolean}) => {
        setFriends(prevFriends => {
          if (userDetails?.id === id) return prevFriends;

          const updatedFriends = [...prevFriends];
          const activeFriend = updatedFriends.find(f => f.id === id);

          if (!activeFriend) return prevFriends;

          activeFriend.isActive = isFriendActive;

          return updatedFriends;
        });
      },
    );

    return () => {
      socket.emit('updateActiveStatus', false);
      socket.off('friendActive');
    };
  }, [socket, isActive, userDetails]);

  return (
    <FriendsContext.Provider value={{friends, isLoading}}>
      {children}
    </FriendsContext.Provider>
  );
};
