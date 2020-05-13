import { View, Image, TouchableWithoutFeedback } from "react-native";
import React from "react";

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Image
          source={{
            uri: "https://aven.sfo2.digitaloceanspaces.com/ReactorAlert.jpg",
          }}
          style={{
            aspectRatio: 52 / 39,
            alignSelf: "stretch",
            transform: [
              {
                translateY: 0,
              },
            ],
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
