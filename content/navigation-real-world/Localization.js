import "react-native-gesture-handler";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
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

const en = {
  taskReactor: "Task Reactor",
  newTaskButton: "New Tasks..",
  relatedTasks: "Related Tasks",
  taskTitle: "{{title}}",
  discuss: "discuss",
  discussTitle: "{{title}}",
};

const pr = {
  taskReactor: "and a bottle of rum",
  newTaskButton: "arr thing to do",
  relatedTasks: "chained mateys",
  taskTitle: "ye {{title}}",
  discuss: "to the depths",
  discussTitle: "olde {{title}}",
};

i18n.fallbacks = true;
i18n.translations = { pr, en };

const TranslationContext = React.createContext(null);

function TranslationProvider({ children }) {
  const [locale, setLocale] = React.useState(Localization.locale); // en, pr
  const translationContext = React.useMemo(() => {
    return {
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    };
  }, [locale]);
  return (
    <TranslationContext.Provider value={translationContext}>
      {children}
    </TranslationContext.Provider>
  );
}

function useTranslator() {
  return React.useContext(TranslationContext).t;
}

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

function SettingsView({}) {
  const { setLocale } = React.useContext(TranslationContext);
  return (
    <>
      <Button title="Language: English" onPress={() => setLocale("en")} />
      <Button title="Language: Pirate" onPress={() => setLocale("pr")} />
    </>
  );
}
function RowContainer({ children }) {
  return (
    <View style={{ borderTopWidth: 1, borderColor: "#ddd" }}>{children}</View>
  );
}
function HomeScreen({ navigation }) {
  const t = useTranslator();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <RowContainer>
        <TaskLink title="Task1" />
        <TaskLink title="Task2" />
      </RowContainer>
      <Button
        title={t("newTaskButton")}
        onPress={() => {
          navigation.navigate("NewTask");
        }}
      />
      <SettingsView />
    </ScrollView>
  );
}

function TaskScreen({ route }) {
  const t = useTranslator();
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>{t("taskTitle", { title: route.params.title })}</Text>
      <Text>{t("relatedTasks")}</Text>
      <TaskLink title="Task3" />
      <TaskLink title="Task4" />
    </ScrollView>
  );
}

function DiscussScreen({ route }) {
  const t = useTranslator();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t(`discuss`)}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function AppNavigator() {
  const t = useTranslator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: t("taskReactor"),
          }}
        />
        <Stack.Screen
          name="Task"
          component={TaskScreen}
          options={({ route, navigation }) => ({
            title: t("taskTitle", { title: route.params?.title }),
            headerRight: () => (
              <Button
                title={t(`discuss`)}
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
            title: t("discussTitle", { title: route.params?.title }),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <TranslationProvider>
      <AppNavigator />
    </TranslationProvider>
  );
}
export default App;
