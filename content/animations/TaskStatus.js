import "react-native-gesture-handler";
import * as React from "react";
import { Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../components/5-HomeScreen";
import NewTaskScreen from "../../components/5-NewTaskScreen";
import {
  useTaskTitle,
  deleteTask,
  useTask,
  setTaskStatus,
} from "../../logic/TaskLogic";
import { ScrollView } from "react-native-gesture-handler";

function TaskStatusRow({ status, onStatus }) {
  return (
    <View style={{ borderTopWidth: 1, borderBottomWidth }}>
      <Text>{status}</Text>
    </View>
  );
}

function TaskScreen({ route, navigation }: TaskScreenProps) {
  const task = useTask(route.params.id);
  if (!task) {
    return null;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <Button
        title="Complete Task"
        onPress={() => {
          setTaskStatus(task.id, "complete");
        }}
      />
      <Button
        title="Abort Task"
        onPress={() => {
          setTaskStatus(task.id, "aborted");
        }}
      />
      <Button
        title="Reset Task Status"
        onPress={() => {
          setTaskStatus(task.id, null);
        }}
      />

      <Text>
        {task.status === "aborted"
          ? "Task Aborted"
          : task.status === "complete"
          ? "Complete"
          : "Pending"}
      </Text>

      <TaskStatusRow
        status={status}
        onStatus={(status) => setTaskStatus(task.id, status)}
      />

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

function TaskTitle({ id }: { id: string }) {
  const title = useTaskTitle(id);
  return <Text>{title}</Text>;
}

function DiscussScreen() {
  return null;
}

const MainStack = createStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Task Reactor!",
        }}
      />
      <MainStack.Screen
        name="Task"
        component={TaskScreen}
        options={({ route, navigation }: any) => ({
          title: <TaskTitle id={route.params.id} />,
          headerRight: () => (
            <Button
              title="Discuss"
              color="#239"
              onPress={() => {
                navigation.navigate("Discuss", {
                  id: route.params.id,
                });
              }}
            />
          ),
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
