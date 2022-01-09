import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import Register from './screens/register';
import Login from './screens/login';
import Home from './screens/home';
import Load from './screens/load';
import Miths from './screens/miths';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="load"
          component={Load}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="miths"
          component={Miths}
          options={{
            headerShown: false
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
