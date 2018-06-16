import { createStore } from "redux";
import memoApp from "./reducers";

export const store = createStore(memoApp);
