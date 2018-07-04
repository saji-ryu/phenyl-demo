// @flow
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import type { Memo } from "../types";

type Props = {
  sortedMemos: Memo[],
  handleTitleButton: Function,
};
const HomeScreen = (props: Props) => {
  const { sortedMemos, handleTitleButton } = props;
  return (
    <ScrollView>
      <View style={styles.viewStyle}>
        {sortedMemos.map(memo => {
          const { id, title } = memo;
          return (
            <TouchableOpacity
              key={id}
              onPress={() => {
                handleTitleButton(id);
              }}
              style={styles.memoTitle}
            >
              <Text style={styles.memoTitleText}>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  memoTitle: {
    height: 65,
    backgroundColor: "#efefef",
    borderWidth: 0.5,
    borderColor: "#adadad",
  },
  viewStyle: {
    flex: 1,
    flexDirection: "column",
  },
  memoTitleText: {
    margin: 10,
    fontSize: 25,
  },
});
