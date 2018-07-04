// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import type { Memo } from "../types";

type Props = {
  memo: Memo,
};

const MemoViewScreen = (props: Props) => (
  <View style={styles.viewStyle}>
    <Text style={styles.connectText}>{props.memo.content}</Text>
  </View>
);

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    margin: 10,
  },
  connectText: {
    fontSize: 20,
  },
});

export default MemoViewScreen;
