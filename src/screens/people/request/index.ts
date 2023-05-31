import {baseURL, get} from '../../../shared/request';
import {FriendRequest} from '../models';

export const getFriendRequests = async () => {
  const {data: friendRequests} = await get<FriendRequest[]>(
    `${baseURL}/get-friends`,
  );

  return friendRequests;
};
