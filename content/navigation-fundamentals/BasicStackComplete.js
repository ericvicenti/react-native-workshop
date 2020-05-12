import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, Button, TouchableHighlight } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";

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
            padding: 20,
          }}
        >
          <Text>{title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <View style={{ borderTopWidth: 1, borderColor: "#ddd" }}>
        <TaskLink title="Task1" />
        <TaskLink title="Task2" />
      </View>
    </ScrollView>
  );
}

function TaskScreen({ route }) {
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
        <Text style={{ fontSize: 42 }}>{route.params.title}</Text>
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

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Task"
          component={TaskScreen}
          options={({ route, navigation }) => ({
            title: route.params?.title,
            headerTintColor: "#239",
            headerRight: () => (
              <Button
                title="Discuss"
                color="#239"
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
            headerTintColor: "#293",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
