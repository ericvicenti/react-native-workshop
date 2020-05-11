# Real world navigation

### Improve Perf with react-native-screens

```js
import { enableScreens } from "react-native-screens";
enableScreens();
```

## Forms and Navigation

### Safe Area Context

```js
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
```

Wrap your app with the `SafeAreaProvider`

```js
<SafeAreaProvider>
  <NavigationContainer>{/*(...) */}</NavigationContainer>
</SafeAreaProvider>
```

To use/see the insets inside the app:

```js
import { useSafeArea } from "react-native-safe-area-context";
const insets = useSafeArea();
```

## Themes

### React Navigation Themes

https://reactnavigation.org/docs/themes/

### Set up react-native-appearance and useColorScheme

```js
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
```

First, wrap your app with `AppearanceProvider`.

Create a theme:

```js
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
  },
};
```

Check for dark mode with `useColorScheme() === 'dark'`, and pass a theme into NavigationContainer

```js
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
```

### Use the theme yourself

```js
import { useTheme } from "@react-navigation/native";

const { colors } = useTheme();
```

## Localization

https://reactnavigation.org/docs/localization/

### Get locale from device

https://docs.expo.io/versions/latest/sdk/localization/

```
import * as Localization from 'expo-localization';

// This will log 'en' for me, as I'm an English speaker
console.log(Localization.locale);
```

## Forms and Back Behavior

### Configure Back Button

### useFocusEffect

### TextInput autoFocus

### KeyboardAvoidingView

### Android BackHandler

### Disable Gestures
