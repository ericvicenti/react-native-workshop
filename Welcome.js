import React from "react";
import { View, Text } from "react-native";

function DisplayText({ children }) {
  return (
    <Text style={{ fontSize: 28, paddingVertical: 40, paddingHorizontal: 16 }}>
      {children}
    </Text>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <DisplayText>Welcome, you have the workshop app running!</DisplayText>
      <DisplayText>Go switch to your current example in `App.js`</DisplayText>
    </View>
  );
}
