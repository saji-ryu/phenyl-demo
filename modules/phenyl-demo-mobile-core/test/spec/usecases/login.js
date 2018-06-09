// @flow
import assert from "assert";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import phenylReducer, { createMiddleware } from "phenyl-redux";
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
          storeKey: "phenyl"
        })
      ]);
    });

    it("should XXX when the email or password is incorrect", async () => {
      const store = createMockStore({
        phenyl: {
          network: {
            requests: []
          }
        }
      });
      store.replaceReducer(combineReducers({ phenyl: phenylReducer }));
      await store.dispatch(
        login({ email: "hoge@example.com", password: "hogehoge" })
      );
      console.log(JSON.stringify(store.getActions(), null, 2));
      console.log(store.getState());
    });
    // it("should XXX when the email and password are correct", () => {
    //   const store = createMockStore({});
    //   store.dispatch(login({ email: "hoge@exampl.com", password: "hogehoge" }));
    // });
  });
});
