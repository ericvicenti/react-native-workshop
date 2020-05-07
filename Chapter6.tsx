import * as React from "react";
import { Text, Button, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SupportScreen from "./components/5-SupportScreen";
import TagsScreen from "./components/5-TagsScreen";
import HomeScreen from "./components/5-HomeScreen";
import TaskScreen from "./components/5-TaskScreen";
import NewTaskScreen from "./components/5-NewTaskScreen";
import { useTaskTitle } from "./TaskLogic";
import Ionicons from "@expo/vector-icons/Ionicons";

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
const TagStack = createStackNavigator();
function TagsStackScreen() {
  return (
    <TagStack.Navigator>
      <TagStack.Screen
        name="Tags"
        component={TagsScreen}
        options={{
          title: "Task Tags",
        }}
      />
      <TagStack.Screen
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
      <TagStack.Screen
        name="Discuss"
        component={DiscussScreen}
        options={({ route, navigation }) => ({
          title: `Discuss Task`,
        })}
      />
    </TagStack.Navigator>
  );
}
const MainTabs = createBottomTabNavigator();
function MainTabsScreen() {
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Support") {
            iconName = focused ? "ios-help-circle" : "ios-help-circle-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "ios-checkbox" : "ios-checkbox-outline";
          } else if (route.name === "Tags") {
            iconName = focused ? "ios-list-box" : "ios-list";
          } else {
            iconName = focused ? "ios-cloud" : "ios-cloud-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <MainTabs.Screen name="Home" component={MainStackScreen} />
      <MainTabs.Screen name="Tags" component={TagsStackScreen} />
      <MainTabs.Screen name="Support" component={SupportScreen} />
    </MainTabs.Navigator>
  );
}

const RootStack = createStackNavigator();

const navPersistenceKey = "NavPersistence";

function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(navPersistenceKey);
        const state = JSON.parse(savedStateString);

        setInitialState(state);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => {
        AsyncStorage.setItem(navPersistenceKey, JSON.stringify(state));

        let walkState = state;
        let routeString = "";
        while (walkState) {
          const route = walkState.routes[walkState.index];
          walkState = route.state;
          routeString += route.name + ",";
          if (route.params)
            routeString +=
              Object.entries(route.params)
                .map((e) => e[0] + ":" + e[1])
                .join(",") + "/";
        }
        console.log("Look at this object for navigation analytics", state);
        console.log(routeString);
      }}
    >
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainTabsScreen}
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
