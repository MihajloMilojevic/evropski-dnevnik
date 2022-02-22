import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function removeUser()
{
	try 
	{
		await AsyncStorage.removeItem("user");
		return true;
	}catch (e) {
		console.error(e);
		return false;
	}
}