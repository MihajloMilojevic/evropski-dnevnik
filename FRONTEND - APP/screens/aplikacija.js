import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { Home, Miths, Leaderboard } from ".";
import Games from "./app/games";
import Profil from "./app/profilInfo";
const Tab = createBottomTabNavigator();

function Aplikacija({}) {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
				let iconName;
	
				switch(route.name)
				{
					case "home":
						iconName = "home";
						break;
					case "games":
						iconName = "gamepad";
						break;
					case "leaderboard":
						return <MaterialIcons name={"leaderboard"} size={size} color={color} />
					default:
						iconName = "undo";
						break;
				}
	
				// You can return any component that you like here!
					return <FontAwesome name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: '#6da0ed',
				tabBarInactiveTintColor: 'gray',
				headerShown: false
			})}
		>
			<Tab.Screen 
				name="home"
				component={Home}
			/>
			<Tab.Screen 
				name="games"
				component={Games}
			/>
			<Tab.Screen 
				name="leaderboard"
				options={{
					unmountOnBlur: true
				}}
				component={Leaderboard}
			/>
			<Tab.Screen 
				name="profil"
				component={Profil}
			/>
		</Tab.Navigator>
	)
}

export default Aplikacija