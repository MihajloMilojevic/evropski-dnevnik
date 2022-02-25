import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import {Register, Login, Load} from "./screens";
import Aplikacija from "./screens/aplikacija";
import {Provider} from "react-redux";
import store from "./redux/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
