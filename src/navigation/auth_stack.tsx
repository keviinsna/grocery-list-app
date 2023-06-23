// React-Native
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';

export default function AuthStack() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
		</Stack.Navigator>
	);
}
