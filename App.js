import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Books from './Screens/Books';
import Lessons from './Screens/Lessons';
import Chapters from './Screens/Chapters';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator

    screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;


          if (route.name === 'Books') {
            iconName = 'book';
          } else if (route.name === 'Chapters') {
            iconName = 'bookmarks';
          } else if (route.name === 'Lessons') {
            iconName = 'document';
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0984e3',
      inactiveTintColor: '#dfe6e9',
      }}
      >
      <Tab.Screen name="Books" component={Books} />
      <Tab.Screen name="Chapters" component={Chapters} />
      <Tab.Screen name="Lessons" component={Lessons} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
