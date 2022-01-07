import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './screens/register';
import Login from './screens/login';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            header: () => null
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
