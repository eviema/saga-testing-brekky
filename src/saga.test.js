import { expectSaga } from "redux-saga-test-plan";
import { fetchUserByIdSaga } from "./saga";
import {
  FETCH_USER_BY_ID,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_ERROR
} from "./actions";
import { getUserById } from "./api";

const initialState = {
  userReducer: {
    currentUserId: "0"
  }
};

function mockReducer(state = initialState, action) {
  if (action.type === FETCH_USER_BY_ID) {
    return {
      userReducer: {
        currentUserId: action.userId
      }
    };
  }
  return state;
}

it("fetches user by ID succesfully", () => {
  const mockRes = {
    data: {
      id: "1",
      name: "test name",
      age: "test age"
    }
  };

  return (
    expectSaga(fetchUserByIdSaga)
      // Hook mock reducer
      .withReducer(mockReducer)

      // Mock response values directly with expectSaga
      .provide({
        call({ fn }, next) {
          if (fn === getUserById) {
            return mockRes;
          }
          return next();
        }
      })

      // Assert action type
      .put.actionType(FETCH_USER_BY_ID_SUCCESS)

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: FETCH_USER_BY_ID, userId: "1" })

      // Start the test. Returns a Promise.
      .silentRun()
  );
});

it("fails to fetch user by ID", () => {
  const error = new Error("error");

  return (
    expectSaga(fetchUserByIdSaga)
      // Hook mock reducer
      .withReducer(mockReducer)

      // Mock response values directly with expectSaga
      .provide({
        call({ fn }, next) {
          if (fn === getUserById) {
            throw error;
          }
          return next();
        }
      })

      // Assert action type
      .put.actionType(FETCH_USER_BY_ID_ERROR)

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: FETCH_USER_BY_ID, userId: "1" })

      // Start the test. Returns a Promise.
      .silentRun()
  );
});
