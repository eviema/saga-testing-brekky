export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

export const FETCH_USER_BY_ID = "FETCH_USER_BY_ID";
export const FETCH_USER_BY_ID_SUCCESS = "FETCH_USER_BY_ID_SUCCESS";
export const FETCH_USER_BY_ID_ERROR = "FETCH_USER_BY_ID_ERROR";

export const fetchUsers = () => ({
  type: FETCH_USERS
});

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const fetchUsersError = error => ({
  type: FETCH_USERS_ERROR,
  error
});

export const fetchUserById = userId => ({
  type: FETCH_USER_BY_ID,
  userId
});

export const fetchUserByIdSuccess = user => ({
  type: FETCH_USER_BY_ID_SUCCESS,
  user
});

export const fetchUserByIdError = error => ({
  type: FETCH_USER_BY_ID_ERROR,
  error
});
