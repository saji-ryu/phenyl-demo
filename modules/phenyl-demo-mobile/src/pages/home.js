// @flow
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const screenSize = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: "Memo",
      headerBackTitle: null,
      headerRight: (
        <Button onPress={() => navigation.navigate("NewMemo")} title="New" />
      ),
    };
  };

  render() {
    let titles = [];
    for (let index = 0; index < 10; index++) {
      titles.push(
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("MemoView")}
          style={styles.memoTitle}
        >
          <Text style={{ margin: 10, fontSize: 25 }}>Title{index + 1}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: "column" }}>{titles}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  memoTitle: {
    height: 65,
    backgroundColor: "#efefef",
    borderWidth: 0.5,
    borderColor: "#adadad",
  },
  f1acjc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
