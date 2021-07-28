import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons"

import Books from "./Screens/Books"
import Lessons from "./Screens/Lessons"
import Chapters from "./Screens/Chapters"

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Livres" component={Books} />
          <Stack.Screen name="Chapitres" component={Chapters} />
          <Stack.Screen name="Leçons" component={Lessons} />
      </Stack.Navigator>
    </NavigationContainer>

    )
  }

export default App