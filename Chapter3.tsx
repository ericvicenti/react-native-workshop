import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import {
  NavigationContainer,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import TaskRow from "./components/3-TaskRow";
import {
  useTaskList,
  useTaskTitle,
  deleteTask,
  useTask,
  createTask,
} from "./TaskLogic";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootParamList = {
  Home: undefined;
  NewTask: undefined;
  Task: { id: string };
};
type HomeScreenNavigationProp = StackNavigationProp<RootParamList, "Home">;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({ navigation }: HomeScreenProps) {
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
      <Button
        title="New Task..."
        onPress={() => {
          navigation.navigate("NewTask");
        }}
      />
    </ScrollView>
  );
}

type TaskScreenProps = {
  route: RouteProp<RootParamList, "Task">;
  navigation: NavigationProp<RootParamList, "Task">;
};

function TaskScreen({ route, navigation }: TaskScreenProps) {
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
type NewTaskScreenProps = {
  navigation: NavigationProp<RootParamList, "NewTask">;
};
function NewTaskScreen({ navigation }: NewTaskScreenProps) {
  const [newTitle, setNewTitle] = React.useState("");
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (newTitle === "") {
          return false;
        } else {
          Alert.alert("Unfinished changes");
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [newTitle === ""])
  );
  function handleSubmit() {
    if (newTitle === "") return;
    createTask(newTitle);
    navigation.goBack();
  }
  function handleNewTitle(title: string) {
    navigation.setOptions({
      gestureEnabled: title === "",
    });
    setNewTitle(title);
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      keyboardVerticalOffset={0}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 10 }} />
        <TextInput
          autoFocus
          value={newTitle}
          onChangeText={handleNewTitle}
          onSubmitEditing={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: 16,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#ddd",
            marginVertical: 10,
          }}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Stack = createStackNavigator();

function TaskTitle({ id }: { id: string }) {
  const title = useTaskTitle(id);
  return <Text>{title}</Text>;
}
function DiscussScreen() {
  return null;
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
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
        <Stack.Screen
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
        <Stack.Screen
          name="Discuss"
          component={DiscussScreen}
          options={({ route, navigation }) => ({
            title: `Discuss Task`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
