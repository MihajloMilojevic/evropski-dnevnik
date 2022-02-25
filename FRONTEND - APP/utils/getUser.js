import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getUser()
{
	try 
	{
		const user = await AsyncStorage.getItem("user");
		return JSON.parse(user);
	}catch (e) {
		console.error(e);
		return null;
	}
}