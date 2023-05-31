import {UserDetails} from '../../auth/models';

export interface ActiveFriends extends UserDetails {
  isActive: boolean;
}
