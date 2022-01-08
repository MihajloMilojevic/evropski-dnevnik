import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getUser()
{
	try 
	{
		const user = await AsyncStorage.getItem("user");
		return user;
	}catch (e) {
		console.error(e);
	}
}