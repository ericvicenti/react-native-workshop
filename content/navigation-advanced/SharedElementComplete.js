import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, Button, Image, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import NewTaskScreen from "../../components/5-NewTaskScreen";
import {
  useTaskList,
  useTaskTitle,
  deleteTask,
  useTask,
} from "../../logic/TaskLogic";
import {
  createSharedElementStackNavigator,
  SharedElement,
} from "react-navigation-shared-element";

function TaskRow({ task, onPress }) {
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
          <View
            style={{
              padding: 20,
              flexDirection: "row",
            }}
          >
            <SharedElement id={`task.${task.id}.photo`}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: task.imageUri }}
              />
            </SharedElement>
            <View style={{ padding: 16, alignSelf: "center" }}>
              <Text>{task.title}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const tasks = useTaskList();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <View style={{ borderTopWidth: 1, borderColor: "#ddd" }}>
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onPress={() => {
              navigation.push("Task", { id: task.id });
            }}
          />
        ))}
      </View>
      <Button
        title="New Task..."
        onPress={() => {
          navigation.navigate("NewTask");
        }}
      />
    </ScrollView>
  );
}

function TaskScreen({ route, navigation }) {
  const task = useTask(route.params.id);
  if (!task) {
    return null;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <SharedElement id={`task.${task.id}.photo`}>
        <Image
          style={{ aspectRatio: 1, alignSelf: "stretch" }}
          source={{ uri: task.imageUri }}
        />
      </SharedElement>
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          paddingVertical: 12,
          paddingTop: 36,
          paddingHorizontal: 20,
        }}
      >
        <Button title="Back" onPress={navigation.goBack} color="black" />
      </View>
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

function DiscussScreen() {
  return null;
}

const MainStack = createSharedElementStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator mode="modal">
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Task"
        component={TaskScreen}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { id } = route.params;
          return [`task.${id}.photo`];
        }}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureResponseDistance: 400,
        })}
      />
      <MainStack.Screen
        name="Discuss"
        component={DiscussScreen}
        options={({ route, navigation }) => ({
          title: `Discuss Task`,
        })}
      />
    </MainStack.Navigator>
  );
}
const RootStack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="NewTask"
          component={NewTaskScreen}
          options={({ navigation }) => ({
            title: "Add Task",
            headerLeft: null,
            headerRight: () => (
              <Button
                title="cancel"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
