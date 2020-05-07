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

const primaryColor = "rgb(85, 105, 225)";

const AppLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
  },
};

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: primaryColor,
  },
};

const TranslationContext = React.createContext(null);

const LANGUAGES = {
  english: (str) => str,
  pirate: (str) => `${str}, matey`,
  // spanish: str => translateToSpanish(str),
};
function TranslationProvider({ children }) {
  const [language, setLanguage] = React.useState("english");
  const translationContext = React.useMemo(() => {
    return {
      getTranslation: LANGUAGES[language],
      language,
      setLanguage,
    };
  }, [language]);
  return (
    <TranslationContext.Provider value={translationContext}>
      {children}
    </TranslationContext.Provider>
  );
}

function useTranslator() {
  return React.useContext(TranslationContext).getTranslation;
}

function TaskLink({ title }: { title: string }) {
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

function SettingsView({}) {
  const { setLanguage } = React.useContext(TranslationContext);
  return (
    <>
      <ThemeButton
        title="Language: English"
        onPress={() => setLanguage("english")}
      />
      <ThemeButton
        title="Language: Pirate"
        onPress={() => setLanguage("pirate")}
      />
    </>
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
  const t = useTranslator();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <RowContainer>
        <TaskLink title="Task1" />
        <TaskLink title="Task2" />
      </RowContainer>
      <ThemeButton
        title={t("New Task...")}
        onPress={() => {
          navigation.navigate("NewTask");
        }}
      />
      <SettingsView />
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
  const t = useTranslator();
  return (
    <ScrollView style={{ flex: 1 }}>
      <TextRow>{t(`Task: ${route.params.title}`)}</TextRow>
      <TextRow>{t(`Other Tasks:`)}</TextRow>
      <TaskLink title="Task3" />
      <TaskLink title="Task4" />
    </ScrollView>
  );
}

function DiscussScreen({ route }) {
  const t = useTranslator();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t(`Discuss`)}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function AppNavigator() {
  const t = useTranslator();
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
            title: t("TaskReactor"),
          }}
        />
        <Stack.Screen
          name="Task"
          component={TaskScreen}
          options={({ route, navigation }) => ({
            title: t(route.params?.title),
            headerRight: () => (
              <ThemeButton
                title={t(`Discuss`)}
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
            title: t(`Discuss ${route.params?.title}`),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <TranslationProvider>
      <AppearanceProvider>
        <AppNavigator />
      </AppearanceProvider>
    </TranslationProvider>
  );
}
export default App;
