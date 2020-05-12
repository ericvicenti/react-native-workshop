import { View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Animated, { Easing } from "react-native-reanimated";

export default function App() {
  const isAnimatingRef = React.useRef(false);
  const [errorProgress] = React.useState(new Animated.Value(0));
  const [photoHeight] = React.useState(new Animated.Value(0));
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (isAnimatingRef.current) {
          return;
        }
        isAnimatingRef.current = true;
        Animated.timing(errorProgress, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
        }).start((result) => {
          console.log("Animation was finished:", result);
          setTimeout(() => {
            Animated.timing(errorProgress, {
              toValue: 0,
              duration: 500,
              easing: Easing.linear,
            }).start(() => {
              isAnimatingRef.current = false;
            });
          }, 3000);
        });
      }}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Animated.Image
          source={{
            uri: "https://aven.sfo2.digitaloceanspaces.com/ReactorAlert.jpg",
          }}
          onLayout={({ nativeEvent }) => {
            photoHeight.setValue(nativeEvent.layout.height);
          }}
          style={{
            aspectRatio: 52 / 39,
            alignSelf: "stretch",
            transform: [
              {
                translateY: Animated.interpolate(errorProgress, {
                  inputRange: [0, 1],
                  outputRange: [photoHeight, 0],
                }),
              },
            ],
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
