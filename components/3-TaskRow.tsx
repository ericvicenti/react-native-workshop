import * as React from "react";
import { View, Text } from "react-native";
import { SafeAreaView, useSafeArea } from "react-native-safe-area-context";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function TaskRow({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  const insets = useSafeArea();
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: "#ddd",
        alignSelf: "stretch",
      }}
    >
      <TouchableHighlight onPress={onPress}>
        <View
          style={{
            backgroundColor: "white",
            alignSelf: "stretch",
            padding: 20,
            paddingLeft: insets.left + 20,
            paddingRight: insets.right + 20,
          }}
        >
          <Text>{title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
