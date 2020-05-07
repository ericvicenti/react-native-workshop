import * as React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

function TitleScreen({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 32, textAlign: "center" }}>{title}</Text>
    </View>
  );
}
function SupportHomeScreen() {
  return <TitleScreen title="Support Home" />;
}
function ReportBugScreen() {
  return <TitleScreen title="Report a Bug" />;
}
function SystemStatusScreen() {
  return <TitleScreen title="System Status" />;
}
const Drawer = createDrawerNavigator();

export default function SupportScreen() {
  return (
    <Drawer.Navigator initialRouteName="SupportHome">
      <Drawer.Screen name="SupportHome" component={SupportHomeScreen} />
      <Drawer.Screen name="ReportBug" component={ReportBugScreen} />
      <Drawer.Screen name="SystemStatus" component={SystemStatusScreen} />
    </Drawer.Navigator>
  );
}
