import { put, call, select } from "redux-saga/effects";

import { handleFetchUserById } from "./saga";
import { fetchUserByIdError, fetchUserByIdSuccess } from "./actions";

import { getUserById } from "./api";

describe("Should test sagas", () => {
  describe("Should test fetchUserById", () => {
    const selector = {
      userReducer: {
        currentUserId: "0"
      }
    };
    const data = {
      result: "success"
    };

    it("when passed userId is the same as current user, fetch it", () => {
      const gen = handleFetchUserById({ userId: "0" });

      expect(gen.next().value).toEqual(select());
      expect(gen.next(selector).value).toEqual(call(getUserById, "0"));
      expect(gen.next(data).value).toEqual(put(fetchUserByIdSuccess()));
      expect(gen.next().done).toBeTruthy();
    });

    it("when passed userId is not the same as current user, fetch passed user", () => {
      const gen = handleFetchUserById({ userId: "1" });

      expect(gen.next().value).toEqual(select());
      expect(gen.next(selector).value).toEqual(call(getUserById, "1"));
      expect(gen.next(data).value).toEqual(put(fetchUserByIdSuccess()));
      expect(gen.next().done).toBeTruthy();
    });

    it("When error, catched by function", () => {
      const gen = handleFetchUserById({ userId: "0" });

      expect(gen.next().value).toEqual(select());
      expect(gen.next(selector).value).toEqual(call(getUserById, "0"));
      expect(gen.throw("error").value).toEqual(
        put(fetchUserByIdError("error"))
      );
      expect(gen.next().done).toBeTruthy();
    });
  });
});
