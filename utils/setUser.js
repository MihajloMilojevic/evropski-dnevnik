import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function setUser(user)
{
	try 
	{
		await AsyncStorage.setItem("user", user);
		return true;
	}catch (e) {
		console.error(e);
		return false;
	}
}