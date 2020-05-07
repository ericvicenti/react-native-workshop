# Workshop Setup

- Check out this repo
- cd to repo and run `yarn`
- `yarn ios` to build and run iOS app
- `yarn android` to build and run Android app
- Edit `App.js` and uncomment out the chapter you are currently on

## New App Setup

Run `expo init $APP_NAME`

Select the 'bare' option, and name your app.

This will set up a normal react native app that depends on open source Expo components.

### Navigation Dependencies

According to https://reactnavigation.org/docs/getting-started, we need the following npm deps:

- @react-navigation/native
- react-native-reanimated
- react-native-gesture-handler
- react-native-screens
- react-native-safe-area-context
- @react-native-community/masked-view

In this tutorial we will also be using the following

- @react-navigation/stack
- @react-navigation/bottom-tabs
- @react-navigation/drawer
- react-native-appearance
- react-navigation-shared-element@next

To install all of these navigation dependencies, run the following yarn command:

```
yarn add  @react-navigation/native react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer react-native-appearance @react-navigation-shared-element
```

### Reanimated and Gesture handler

These are needed for several chapters, but they are already included in the above navigation dependencies.

### Native Dependency Install

To install the iOS cocoapods dependencies, after running your `yarn add`, run `pod install` in the `ios` directory.

Then you can run `yarn ios` to build and re-install the iOS app in the simulator, and `yarn android` to build and run on the Android emulator.

### App Code

You can use the `ChapterX.tsx` module as as your `App.tsx`, and you may need to copy over files from `components` and `logic`
