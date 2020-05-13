import React from "react";
import { View } from "react-native";

export default function TapHandler() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: "blue",
          borderRadius: 100,
        }}
      />
    </View>
  );
}
