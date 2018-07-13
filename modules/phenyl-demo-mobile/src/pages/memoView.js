// @flow
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";

import type { Memo } from "../types";

const screenSize = Dimensions.get("window");

type Props = {
  memo: Memo,
  handleDeleteButton: Function,
};

export default class MemoViewScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
  }
  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.connectText}>
          {this.props.memo && this.props.memo.content}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            this.showAlert(this.props);
          }}
        >
          <Image
            style={styles.deleteImage}
            source={require("../../images/delete-icon.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
  showAlert() {
    console.log(this.props);
    Alert.alert(
      "警告",
      "メモを削除しますがよろしいですか？",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => this.props.handleDeleteButton(this.props.memo.id),
        },
      ],
      { cancelable: true }
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    margin: 10,
  },
  connectText: {
    flex: 10,
    fontSize: 20,
  },
  deleteImage: {
    width: 40,
    height: 40,
  },
  deleteButton: {
    start: screenSize.width - 60,
    width: 40,
    height: 40,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginEnd: 10,
  },
});

// export default MemoViewScreen;
