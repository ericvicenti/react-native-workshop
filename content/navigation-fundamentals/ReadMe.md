# Navigation Fundamentals

## What and Why a navigation library?

## React Navigation Pitch (and anti-pitch)

https://reactnavigation.org/docs/pitch

## Creating a new app with React Navigation

> Workshop Instructions: Start by checking out this repo, you won't actually need to create a new app. Also make sure you are fully set up to run react native apps on iOS or Android. Follow the [official RN guide](https://reactnative.dev/docs/environment-setup), click "React Native CLI Quickstart", click your OS, then click iOS/Android.

### New App Setup

Run `expo init $APP_NAME`

Select the 'bare' option, and name your app.

This will set up a normal react native app that depends on open source Expo components.

### Navigation Dependencies

Follow along https://reactnavigation.org/docs/getting-started

Because we have a bare RN project, we need the following npm deps:

- @react-navigation/native
- react-native-reanimated
- react-native-gesture-handler
- react-native-screens
- react-native-safe-area-context
- @react-native-community/masked-view

In this workshop we will also be demonstrating the following.

- @react-navigation/stack
- @react-navigation/bottom-tabs
- @react-navigation/drawer
- react-native-appearance
- react-navigation-shared-element@next
- expo-localization
- i18n-js

To install all of these navigation dependencies, run the following yarn command:

```
yarn add  @react-navigation/native react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer react-native-appearance @react-navigation-shared-element
```

> Workshop Instructions: Run yarn in this repo to install all the dependencies

### Reanimated and Gesture handler

These are needed for the animation and gesture chapters, but they are included in the above navigation dependencies.

### Native Dependency Install

To install the iOS cocoapods dependencies, after running your `yarn add`, run `pod install` in the `ios` directory.

### Rebuild Native Apps

Then you can run `yarn ios` to build and re-install the iOS app in the simulator, and `yarn android` to build and run on the Android emulator.

> Workshop Instructions: Run `yarn ios` and/or `yarn android` to run the example "TaskReactor" app. Edit `App.js` to point to each example in the workshop

## Navigation and Navigators

https://reactnavigation.org/docs/hello-react-navigation

> Workshop Instructions: Edit `App.js` to use `navigation-fundamentals/BasicStack.js`, and edit the code in [BasicStack.js](./BasicStack.js). Once this section is complete, your code might look like [BasicStackComplete.js](BasicStackComplete.js)

We're going to navigate between our first screens.

### Navigate vs Push

https://reactnavigation.org/docs/navigating

### Params

https://reactnavigation.org/docs/params

### Options and setOptions

https://reactnavigation.org/docs/headers

- Options on the screen configuration
- Options based on params
- Set options within the screen

### The navigation prop

https://reactnavigation.org/docs/navigation-prop

# Tabs, Modals, and Drawers

See the example code: [Chapter4.tsx](../Chapter4.tsx)

## Nesting Navigators

## Modal Stack

https://reactnavigation.org/docs/modal

## Tabs

https://reactnavigation.org/docs/tab-based-navigation

https://reactnavigation.org/docs/bottom-tab-navigator

https://reactnavigation.org/docs/material-bottom-tab-navigator

https://reactnavigation.org/docs/material-top-tab-navigator

## Drawer

https://reactnavigation.org/docs/drawer-based-navigation

https://reactnavigation.org/docs/drawer-navigator

## Navigate across your app

```js
navigation.navigate("Support", {
  screen: "ReportBug",
});
```
