import "react-native-gesture-handler";
import * as React from "react";
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

function TaskLink({ title }) {
  const { push } = useNavigation();
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
          push("Task", { title });
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignSelf: "stretch",
          }}
        >
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

function RowContainer({ children }) {
  return (
    <View style={{ borderTopWidth: 1, borderColor: "#ddd" }}>{children}</View>
  );
}
function HomeScreen({ navigation }) {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <RowContainer>
        <TaskLink title="Task1" />
        <TaskLink title="Task2" />
      </RowContainer>
      <Button title="New Task..." onPress={() => {}} />
    </ScrollView>
  );
}

function TaskScreen({ route }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>Task: {route.params.title}</Text>
      <Text>Other Tasks:</Text>
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

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "TaskReactor",
          }}
        />
        <Stack.Screen
          name="Task"
          component={TaskScreen}
          options={({ route, navigation }) => ({
            title: route.params?.title,
            headerRight: () => (
              <Button
                title="Discuss"
                onPress={() => {
                  navigation.navigate("Discuss", {
                    title: route.params?.title,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Discuss"
          component={DiscussScreen}
          options={({ route, navigation }) => ({
            title: `Discuss ${route.params?.title}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
