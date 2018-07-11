// @flow
import { withFormik } from "formik";
import * as React from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  Dimensions,
} from "react-native";

const screenSize = Dimensions.get("window");

const LoginForm = ({
  setFieldValue,
  values,
  errors,
  touched,
  isValid,
  handleSubmit,
  setFieldTouched,
  setErrors,
  validate,
  props,
}) => (
  <View style={styles.loginForm}>
    <View style={styles.f1jc}>
      <Text style={styles.contentText}>Mail</Text>
      <TextInput
        style={[styles.loginTextInput, errors.email && styles.errorInput]}
        onChangeText={text => setFieldValue("email", text)}
        value={values.email}
        autoCapitalize="none"
      />
      {touched.email &&
        errors.email && <Text style={styles.errorInput}>{errors.email}</Text>}
    </View>
    <View style={styles.f1jc}>
      <Text style={styles.contentText}>Password</Text>
      <TextInput
        style={styles.loginTextInput}
        onChangeText={text => {
          setFieldValue("password", text);
        }}
        value={values.password}
        autoCapitalize="none"
      />
      {touched.password &&
        errors.password && (
          <Text style={styles.errorInput}>{errors.password}</Text>
        )}
    </View>
    <View style={styles.f1acjc}>
      <Button onPress={handleSubmit} title="Login" />
    </View>
  </View>
);

export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    email: "hoge@example.com",
    password: "hogehoge",
  }),
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
    const errors = {};
    if (!values.email) {
      errors.email = "メールアドレスが入力されていません";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "不適切なメールアドレスです";
    }
    if (!values.password) {
      errors.password = "パスワードが入力されていません";
    }
    console.log(errors);
    return errors;
  },
  // Submission handler
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  },
})(LoginForm);

const styles = {
  loginForm: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  loginTextInput: {
    height: 40,
    width: screenSize.width - 60,
    fontSize: 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 1,
  },
  f1acjc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  f1jc: {
    flex: 1,
    justifyContent: "center",
  },
  viewStyle: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorInput: {
    color: "red",
  },
  titleText: { fontSize: 40 },
  contentText: { fontSize: 30, marginBottom: 10 },
};
