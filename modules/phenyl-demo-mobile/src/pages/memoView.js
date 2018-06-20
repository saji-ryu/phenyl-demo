// @flow
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";

export default class MemoViewScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: "タイトルが入る",
      headerBackTitle: "Save",
      headerRight: (
        <Button onPress={() => navigation.navigate("MemoEdit")} title="Edit" />
      ),
    };
  };
  render() {
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{ fontSize: 20 }}>メモの内容です</Text>
      </View>
    );
  }
}
