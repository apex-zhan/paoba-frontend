import { UserType } from "../models/User";

/**
 * 存储当前用户的缓存状态
 */
let currentUser: UserType;
const setCurrentUserStates = (user: UserType) => {
  currentUser = user;
};
const getCurrentUserStates = (): UserType => currentUser;

export { getCurrentUserStates, setCurrentUserStates, currentUser };
