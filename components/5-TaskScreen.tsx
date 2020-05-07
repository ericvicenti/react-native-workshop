import * as React from "react";
import { Text, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { deleteTask, useTask } from "../logic/TaskLogic";

export default function TaskScreen({ route, navigation }: TaskScreenProps) {
  const task = useTask(route.params.id);
  if (!task) {
    return null;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>{task.title}</Text>
      <Text>{task.isComplete ? "Complete" : "Not Complete"}</Text>
      <Button
        title="Delete Task"
        onPress={() => {
          navigation.goBack();
          deleteTask(task.id);
        }}
        color="#922"
      />
    </ScrollView>
  );
}
