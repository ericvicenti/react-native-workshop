import * as React from "react";
import {
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { createTask } from "../TaskLogic";

export default function NewTaskScreen({ navigation }: any) {
  const [newTitle, setNewTitle] = React.useState("");
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (newTitle === "") {
          return false;
        } else {
          Alert.alert("Unfinished changes");
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [newTitle === ""])
  );
  function handleSubmit() {
    if (newTitle === "") return;
    createTask(newTitle);
    navigation.goBack();
  }
  function handleNewTitle(title: string) {
    navigation.setOptions({
      gestureEnabled: title === "",
    });
    setNewTitle(title);
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      keyboardVerticalOffset={0}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 10 }} />
        <TextInput
          autoFocus
          value={newTitle}
          onChangeText={handleNewTitle}
          onSubmitEditing={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: 16,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#ddd",
            marginVertical: 10,
          }}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
