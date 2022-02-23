import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import {Register, Login, Load} from "./screens";
import Aplikacija from "./components/aplikacija";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="load"
          component={Load}
        />
        <Stack.Screen
          name="register"
          component={Register}
        />
        <Stack.Screen
          name="login"
          component={Login}
        />
        <Stack.Screen
          name="app"
          component={Aplikacija}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
