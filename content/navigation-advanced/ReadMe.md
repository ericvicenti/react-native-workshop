# I. URIs and Deep Linking

You can use a custom scheme on your device to open your app on iOS or Android, where the url starts with `myapp://`. Your website can also be configured to redirect to your app, when it is available. For this reason, it is

## Native Setup

We will use uri-scheme to do the native configuration. Learn the commands with `npx uri-scheme -h`

Start by listing the uri schemes in the app:

```
npx uri-scheme list --android
npx uri-scheme list --ios --info-path ios/TaskReactor/Info.plist
```

Then go ahead and add your scheme. Here we add 'taskreact', but your app can support several schemes.

```
npx uri-scheme add taskreact --android
npx uri-scheme add taskreact --ios --info-path ios/TaskReactor/Info.plist
```

Rebuild the native apps:

```
yarn ios
yarn android
```

Verify it worked by running the "list" commands again.

## JS App Setup

https://reactnavigation.org/docs/deep-linking/

Configure linking in the navigation container, providing your prefix, and a mapping of routes to paths:

```
function App() {
  const linking = {
    prefixes: ['taskreact://'],
    config: {
      ...routePathConfig
    }
  });
  return <NavigationContainer linking={linking}>
    ...
```

## Route path configuration

https://reactnavigation.org/docs/configuring-links/

## Ready to Test

Now we are ready to open URIs with commands like this:

```
npx uri-scheme open --android taskreact://home

```

# II. State Persistence & Analytics Tracking

https://reactnavigation.org/docs/state-persistence

State is managed in the container as one object. If you make sure your state is serializable

## State Serializability

Make sure your state is:

- JSON-serializable: no recursion, no class-based objects, no Dates
- Logically robust: no view or redundant state, only IDs and enums

## Container initialState

## Container onStateChange

## User Navigation Analytics

In addition to persisting the state, onStateChange is useful for reporting the user's navigation to an analytics server. You can look at the index and routes of the navigation state to determine the active route, which has a name and params. Repeat for children routes in route.state.

## Cautions with State Serialization

- Crashes on App Updates when routes change
- Possible to leave your app in a broken state, you should have a fallback that destroys the persisted state and re-tries

**When using state serialization and over-the-air updates, make sure you always provide backwards-compatible route names**

# III. Shared Element Transitions

Create beautiful transitions with (react-navigation-shared-element)[https://github.com/IjzerenHein/react-navigation-shared-element/tree/navigation-v5]

**Warning** this is experimental right now, and is not yet reccomended for production.

> RN Workshop: Start with the example code at (`./SharedElement.js`)[./SharedElement.js], try to add shared element transitions to the photos in the app. An example solution is here: (`./SharedElementComplete.js`)[./SharedElementComplete.js]

## createSharedElementStackNavigator

## SharedElement
