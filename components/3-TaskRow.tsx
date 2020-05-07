import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function TaskRow({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: "#ddd",
        alignSelf: "stretch",
      }}
    >
      <TouchableHighlight onPress={onPress}>
        <View style={{ backgroundColor: "white", alignSelf: "stretch" }}>
          <SafeAreaView>
            <View
              style={{
                padding: 20,
              }}
            >
              <Text>{title}</Text>
            </View>
          </SafeAreaView>
        </View>
      </TouchableHighlight>
    </View>
  );
}
