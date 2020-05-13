import "react-native-gesture-handler";
import * as React from "react";
import { Text, Button, View, ScrollView } from "react-native";
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
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { Easing } from "react-native-reanimated";

const cancelledColor = "#922";
const doneColor = "#292";

function DoneIcon() {
  return (
    <Ionicons name="ios-checkmark-circle-outline" color={doneColor} size={80} />
  );
}
function CancelledIcon() {
  return (
    <Ionicons
      name="ios-close-circle-outline"
      color={cancelledColor}
      size={80}
    />
  );
}

function TaskStatusRow({ status, onStatus }) {
  const currentStatus =
    status === "cancelled" ? -1 : status === "complete" ? 1 : 0;
  const [currentStatusValue] = React.useState(new Animated.Value(0));
  const cancelledProgress = currentStatusValue.interpolate({
    inputRange: [-1, 0],
    outputRange: [1, 0],
  });
  const doneProgress = currentStatusValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  React.useEffect(() => {
    Animated.timing(currentStatusValue, {
      duration: 500,
      easing: Easing.linear,
      toValue: currentStatus,
    }).start();
  }, [currentStatus]);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
      }}
    >
      <Animated.View
        style={{
          opacity: cancelledProgress,
        }}
      >
        <CancelledIcon />
      </Animated.View>
      <Animated.View
        style={{
          opacity: doneProgress,
        }}
      >
        <DoneIcon />
      </Animated.View>
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 80,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View>
          <Animated.Text
            style={{ color: doneColor, fontSize: 32, opacity: doneProgress }}
          >
            Complete
          </Animated.Text>
        </View>
        <View>
          <Animated.Text
            style={{
              color: cancelledColor,
              fontSize: 32,
              opacity: cancelledProgress,
            }}
          >
            Cancelled
          </Animated.Text>
        </View>
      </View>
    </View>
  );
}

function TaskScreen({ route, navigation }) {
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
        title="Cancel Task"
        onPress={() => {
          setTaskStatus(task.id, "cancelled");
        }}
      />
      <Button
        title="Reset Task Status"
        onPress={() => {
          setTaskStatus(task.id, null);
        }}
      />

      <Text>
        {task.status === "cancelled"
          ? "Task Cancelled"
          : task.status === "complete"
          ? "Complete"
          : "Pending"}
      </Text>

      <TaskStatusRow
        status={task.status}
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
        options={({ route, navigation }) => ({
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
