// React-Native
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Home from '../screens/home';

export default function HomeStack() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	);
}
