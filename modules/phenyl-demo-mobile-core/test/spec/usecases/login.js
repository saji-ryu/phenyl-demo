// @flow

//ローカルでmbaasサーバーを立ち上げてからテスト実行すること
import assert from "assert";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createMiddleware } from "phenyl-redux";
import PhenylHttpClient from "phenyl-http-client";
import configureStore from "redux-mock-store";
import { login } from "../../../src/usecases/login";

describe("usecase", () => {
  describe("login", () => {
    let createMockStore;
    before(() => {
      const httpClient = new PhenylHttpClient({ url: "http://localhost:8888" });
      createMockStore = configureStore([
        thunkMiddleware,
        createMiddleware({
          client: httpClient,
          storeKey: "phenyl",
        }),
      ]);
    });

    it("should get error when the email or password is incorrect", async () => {
      const store = createMockStore({
        phenyl: {
          network: {
            requests: [],
          },
        },
      });
      await store.dispatch(
        login({ email: "hoge@example.com", password: "foo" }),
      );

      const loginOperation = store.getActions()[2].payload[0];
      assert.ok(loginOperation.$set.error);
      assert.equal(loginOperation.$set.error.type, "Unauthorized");
    });

    it("should successfully login when the email and password are correct", async () => {
      const store = createMockStore({
        phenyl: {
          network: {
            requests: [],
          },
        },
      });
      await store.dispatch(
        login({ email: "hoge@example.com", password: "hogehoge" }),
      );

      const loginOperation = store.getActions()[2].payload[0];
      assert.ok(loginOperation.$set.session);
      assert.equal(loginOperation.$set.session.entityName, "user");
      assert.equal(loginOperation.$set.session.userId, "hoge");
    });
  });
});
