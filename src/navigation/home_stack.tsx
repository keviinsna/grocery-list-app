// React-Native
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Home from '../screens/home';
import List from '../screens/list';

interface ListParams {
	user_id: string;
	card_id: number;
	card_name: string;
}

export type HomeStackParams = {
	Home: undefined;
	List: ListParams;
};

export default function HomeStack() {
	const Stack = createNativeStackNavigator<HomeStackParams>();

	return (
		<Stack.Navigator screenOptions={{ title: '' }}>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{ title: 'Grocery List App', headerTitleAlign: 'center' }}
			/>
			<Stack.Screen name="List" component={List} />
		</Stack.Navigator>
	);
}
