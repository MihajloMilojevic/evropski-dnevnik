import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import {Register, Login, Load} from "./screens";
import Aplikacija from "./components/aplikacija";

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
          name="app"
          component={Aplikacija}
          
          options={{
            headerShown: false
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
