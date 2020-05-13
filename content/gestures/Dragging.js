import React from "react";
import { View } from "react-native";
import { State, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { interpolate } from "react-native-reanimated";

const { Value, event, call, useCode, eq, cond, add, block, set } = Animated;

export default function TapHandler() {
  const [tapState] = React.useState(new Value(State.UNDETERMINED));
  const [gestureTranslateX] = React.useState(new Value(0));
  const [gestureTranslateY] = React.useState(new Value(0));
  const [droppedX] = React.useState(new Value(0));
  const [droppedY] = React.useState(new Value(0));
  const translateX = add(droppedX, gestureTranslateX);
  const translateY = add(droppedY, gestureTranslateY);
  const stateChangeEvent = React.useMemo(
    () => event([{ nativeEvent: { state: tapState } }]),
    []
  );
  const gestureEvent = React.useMemo(() =>
    event([
      {
        nativeEvent: {
          translationX: gestureTranslateX,
          translationY: gestureTranslateY,
        },
      },
    ])
  );
  useCode(
    () =>
      cond(
        eq(tapState, State.END),
        block([
          set(droppedX, translateX),
          set(droppedY, translateY),
          call([translateX, translateY], ([x, y]) => {
            console.log(`You dropped the ball at ${x}, ${y}!`);
          }),
        ])
      ),
    []
  );

  const [circleOpacity] = React.useState(
    interpolate(translateY, {
      inputRange: [50, 130],
      outputRange: [0.2, 1],
      extrapolate: "clamp",
    })
  );
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PanGestureHandler
        onHandlerStateChange={stateChangeEvent}
        onGestureEvent={gestureEvent}
      >
        <Animated.View>
          <Animated.View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "blue",
              borderRadius: 25,
              opacity: circleOpacity,
              transform: [{ translateX }, { translateY }],
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
