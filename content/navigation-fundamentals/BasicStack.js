import * as React from "react";
import { View, Text, TouchableHighlight, ScrollView } from "react-native";

function TaskLink({ title }) {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: "#ddd",
        alignSelf: "stretch",
      }}
    >
      <TouchableHighlight
        onPress={() => {
          // todo: make this link to the tasks screen
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignSelf: "stretch",
            padding: 20,
          }}
        >
          <Text>{title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <View style={{ borderTopWidth: 1, borderColor: "#ddd" }}>
        <TaskLink title="Task1" />
        <TaskLink title="Task2" />
      </View>
    </ScrollView>
  );
}

function TaskScreen() {
  const taskTitle = "task title?";
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#ddd",
          backgroundColor: "white",
          padding: 20,
          marginVertical: 8,
        }}
      >
        <Text style={{ fontSize: 42 }}>{taskTitle}</Text>
      </View>
      <Text style={{ marginHorizontal: 16, marginVertical: 8 }}>
        Other Tasks:
      </Text>
      <TaskLink title="Task3" />
      <TaskLink title="Task4" />
    </ScrollView>
  );
}

function DiscussScreen({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Discuss</Text>
    </View>
  );
}

export default HomeScreen;
