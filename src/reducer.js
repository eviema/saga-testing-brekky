import { combineReducers } from "redux";
import update from "immutability-helper";
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_ERROR
} from "./actions";

const initialState = {
  users: [],
  currentUserId: "0",
  currentUser: {
    id: "0"
  },
  error: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return update(state, {
        users: { $set: action.users || [] }
      });
    case FETCH_USERS_ERROR:
      return update(state, {
        error: { $set: action.error }
      });
    case FETCH_USER_BY_ID_SUCCESS:
      return update(state, {
        currentUser: { $set: action.user || [] },
        currentUserId: {
          $set:
            action.user.id === state.currentUserId ? "0" : action.user.id || []
        }
      });
    case FETCH_USER_BY_ID_ERROR:
      return update(state, {
        error: { $set: action.error }
      });
    default:
      return state;
  }
};

export default combineReducers({
  userReducer
});
