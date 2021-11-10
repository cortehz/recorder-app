import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/views/Home";
import CreateNote from "./src/views/CreateNote";

function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        // drawerContent={(props) => <CustomDrawerContent {...props} />}

        initialRouteName="Home"
      >
        <Drawer.Screen name="Brand" component={Home} />
        <Drawer.Screen name="My notes" component={Feed} />
        <Drawer.Screen name="Create a note" component={CreateNote} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
