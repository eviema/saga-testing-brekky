import { takeLatest, select, call, put, all, fork } from "redux-saga/effects";
import {
  FETCH_USERS,
  FETCH_USER_BY_ID,
  fetchUsersSuccess,
  fetchUsersError,
  fetchUserByIdSuccess,
  fetchUserByIdError
} from "./actions";
import { getUsers, getUserById } from "./api";

export function* fetchUsersSaga() {
  yield takeLatest(FETCH_USERS, handleFetchUsers);
}

function* handleFetchUsers() {
  try {
    const { data: resData } = yield call(getUsers);
    yield put(fetchUsersSuccess(resData));
  } catch (error) {
    yield put(fetchUsersError(error));
  }
}

export function* fetchUserByIdSaga() {
  yield takeLatest(FETCH_USER_BY_ID, handleFetchUserById);
}

function* handleFetchUserById({ userId }) {
  const {
    userReducer: { currentUserId }
  } = yield select();
  try {
    const { data: resData } = yield call(
      getUserById,
      currentUserId === userId ? currentUserId : userId
    );
    yield put(fetchUserByIdSuccess(resData));
  } catch (error) {
    yield put(fetchUserByIdError(error));
  }
}

export default function* rootSaga() {
  yield all([fork(fetchUsersSaga), fork(fetchUserByIdSaga)]);
}
