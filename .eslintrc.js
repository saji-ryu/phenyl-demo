module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "standard",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard",
  ],

  plugins: ["prettier", "flowtype", "react", "react-native"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-console": "off", // プロダクトではやらないほうがいいよ
    "no-multi-spaces": "off",
    "comma-dangle": "off",
    "react/display-name": "off",
    "react/jsx-boolean-value": "error",
    "react/no-redundant-should-component-update": "error",
    "react/no-typos": "error",
    "react/no-unused-state": "error",
    "react/no-unused-prop-types": "error",
    "react-native/no-color-literals": "warn",
    "flowtype/define-flow-type": 1,
    "flowtype/use-flow-type": 1,
    "prefer-default-export": "off",
    "import/default": "off",
    "import/no-duplicates": "error",
    "prettier/prettier": "error",
  },
};
