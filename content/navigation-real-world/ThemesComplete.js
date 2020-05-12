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
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";

const AppLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(85, 105, 225)",
  },
};

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "salmon",
  },
};

function TaskLink({ title }) {
  const { push } = useNavigation();
  const theme = useTheme();
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
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
            backgroundColor: theme.colors.background,
            alignSelf: "stretch",
          }}
        >
          <SafeAreaView>
            <View
              style={{
                padding: 20,
              }}
            >
              <Text style={{ color: theme.colors.text }}>{title}</Text>
            </View>
          </SafeAreaView>
        </View>
      </TouchableHighlight>
    </View>
  );
}

function RowContainer({ children }) {
  const theme = useTheme();
  return (
    <View style={{ borderTopWidth: 1, borderColor: theme.colors.border }}>
      {children}
    </View>
  );
}
function HomeScreen({ navigation }) {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <RowContainer>
        <TaskLink title="Task1" />
        <TaskLink title="Task2" />
      </RowContainer>
      <ThemeButton title="New Task..." onPress={() => {}} />
    </ScrollView>
  );
}
function ThemeButton(props) {
  const theme = useTheme();
  return <Button color={theme.colors.primary} {...props} />;
}
function TextRow({ children }) {
  const theme = useTheme();
  return <Text style={{ color: theme.colors.text }}>{children}</Text>;
}

function TaskScreen({ route }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TextRow>Task: {route.params.title}</TextRow>
      <TextRow>Other Tasks:</TextRow>
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
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      theme={scheme === "dark" ? AppDarkTheme : AppLightTheme}
    >
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
              <ThemeButton
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

function App() {
  return (
    <AppearanceProvider>
      <AppNavigator />
    </AppearanceProvider>
  );
}
export default App;
