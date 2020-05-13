import React from "react";
import { View } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const { Value, event, call, useCode, eq, cond } = Animated;

export default function TapHandler() {
  const [tapState] = React.useState(new Value(State.UNDETERMINED));
  const stateChangeEvent = React.useMemo(
    () => event([{ nativeEvent: { state: tapState } }]),
    []
  );
  useCode(
    () =>
      cond(
        eq(tapState, State.END),
        call([tapState], () => {
          console.log("WOAH, TAPPED!");
        })
      ),
    []
  );
  const [circleOpacity] = React.useState(
    cond(eq(tapState, State.BEGAN), 1, 0.2)
  );
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TapGestureHandler onHandlerStateChange={stateChangeEvent}>
        <Animated.View>
          <Animated.View
            style={{
              width: 200,
              height: 200,
              backgroundColor: "blue",
              borderRadius: 100,
              opacity: circleOpacity,
            }}
          />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
}
