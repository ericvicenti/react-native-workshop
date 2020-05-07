# URIs and Deep Linking

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

Configure linking in the navigation container, providing your prefix, and a mapping of routes to paths:

```
function App() {
  const linking = {
    prefixes: ['taskreact'],
  });
  return <NavigationContainer linking={linking}>
    ...
```

## Ready to Test

Now we are ready to open URIs with commands like this:

```
npx uri-scheme open --android taskreact://home

```
