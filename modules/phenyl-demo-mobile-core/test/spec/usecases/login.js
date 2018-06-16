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
      /* middlewareを指定して、Storeのモックを作る関数を作る
       * 渡すmiddlewearは配列
       * middlewearを適用しmockstoreのインスタンスを作る関数をreturn
       */
      createMockStore = configureStore([
        //from redux-thunk
        thunkMiddleware,
        //from phenyl redux
        //middlewearとしてphenylと連携するための設定？
        createMiddleware({
          client: httpClient,
          storeKey: "phenyl", //なんのkeyだろう
        }),
      ]);
    });

    it("should get error when the email or password is incorrect", async () => {
      //Storeのインスタンス作成
      const store = createMockStore({
        //何を指定している？storeの初期値？
        phenyl: {
          network: {
            requests: [],
          },
        },
      });
      // storeにactionを投げてるはず
      //てことはloginの戻り値はactionなはずなのだ
      //actionはtypeプロパティを持った任意のオブジェクト
      await store.dispatch(
        //redux-thunkの機能
        //関数を投げるとそのstoreのdispatch機能とgetstate機能をその関数に渡すことができる
        login({ email: "hoge@example.com", password: "foo" })
      );
      //getActionsは何をしている？
      //redux-mock-storeの機能らしい
      //storeのこれまでのactionが取れる？
      //  redux-mock-storeの機能としてdispatchするとそのactionが配列として記憶される
      //  これを持ってくる
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
        login({ email: "hoge@example.com", password: "hogehoge" })
      );

      const loginOperation = store.getActions()[2].payload[0];
      assert.ok(loginOperation.$set.session);
      assert.equal(loginOperation.$set.session.entityName, "user");
      assert.equal(loginOperation.$set.session.userId, "hoge");
    });
  });
});
