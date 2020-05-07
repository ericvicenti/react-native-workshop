import { View, Animated, Easing, TouchableWithoutFeedback } from "react-native";
import React from "react";

export default function App() {
  const isAnimatingRef = React.useRef(false);
  const [errorProgress] = React.useState(new Animated.Value(0));
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
          easing: Easing.poly(5),
        }).start(({ finished }) => {
          console.log("Animation was finished:", finished);
          setTimeout(() => {
            Animated.timing(errorProgress, {
              toValue: 0,
              duration: 500,
              easing: Easing.poly(5),
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
            uri:
              "https://i.pinimg.com/564x/9d/bb/78/9dbb78df3604587ae97ffc7ed364e363.jpg",
          }}
          style={{
            aspectRatio: 52 / 39,
            alignSelf: "stretch",
            transform: [
              {
                translateY: errorProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [350, 0],
                }),
              },
            ],
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
