import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TaskRow from "./3-TaskRow";
import { useTaskList } from "../TaskLogic";

export default function TagsScreen({ navigation }: any) {
  const tasks = useTaskList();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <View style={{ borderTopWidth: 1, borderColor: "#ddd" }}>
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            title={task.title}
            onPress={() => {
              navigation.push("Task", { id: task.id });
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}
