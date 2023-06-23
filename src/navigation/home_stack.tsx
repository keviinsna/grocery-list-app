// React-Native
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import FoodTab from '../screens/foods';

export default function HomeStack() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="FoodTab" component={FoodTab} />
		</Stack.Navigator>
	);
}
