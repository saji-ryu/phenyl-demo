// @flow
import React, { Component } from "react";
import { StyleSheet, View, Button, TextInput, Dimensions } from "react-native";

const screenSize = Dimensions.get("window");

export default class NewMemoScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: <TextInput style={styles.editMemoTitle} value="" />,
      headerRight: (
        <Button onPress={() => navigation.navigate("Home")} title="Save" />
      ),
    };
  };
  render() {
    return (
      <View style={styles.f1acjc}>
        <TextInput
          multiline
          style={styles.editMemoContent}
          //onChangeText={text => this.setState({ text })}
          value=""
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editMemoContent: {
    height: screenSize.height - 100,
    width: screenSize.width - 20,
    fontSize: 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 0.5,
  },
  editMemoTitle: {
    height: 30,
    width: 200,
    fontSize: 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 0.5,
  },
  f1acjc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
