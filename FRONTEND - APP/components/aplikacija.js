import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

import { Home, Miths, Library } from "../screens";
const Tab = createBottomTabNavigator();

function Aplikacija({}) {
	return (
		<Tab.Navigator>
			<Tab.Screen 
				name="home"
				component={Home}
				options={{
					headerShown: false
				}}
			/>
			<Tab.Screen 
				name="miths"
				component={Miths}
				options={{
					headerShown: false
				}}
			/>
			<Tab.Screen 
				name="biblioteka"
				component={Library}
				options={{
					headerShown: false
				}}
			/>
		</Tab.Navigator>
	)
}

export default Aplikacija