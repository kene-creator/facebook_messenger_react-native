import {baseURL, post, get} from '../../request';

import {Credentials, LoginUser, NewUser, UserDetails} from '../models';

export const getUsers = async () => {
  const {data: users} = await get<UserDetails[]>(`${baseURL}/auth`);

  return users;
};

export const register = async (newUser: NewUser) => {
  const {data: user} = await post<UserDetails>(
    `${baseURL}/auth/register`,
    newUser,
  );

  return user;
};

export const login = async (loginUser: LoginUser) => {
  const {data: credentials} = await post<Credentials>(
    `${baseURL}/auth/login`,
    loginUser,
  );
  console.log(credentials);
  return credentials;
};
