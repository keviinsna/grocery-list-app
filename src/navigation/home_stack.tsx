// React-Native
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Home from '../screens/home';
import List from '../screens/list';

interface ListParams {
	user_id: number;
	card_id: number;
	card_name: string;
}

export interface HomeStackParams {
	Home: undefined;
	List: ListParams;
}

export default function HomeStack() {
	const Stack = createNativeStackNavigator<HomeStackParams>();

	return (
		<Stack.Navigator screenOptions={{ title: '' }}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="List" component={List} />
		</Stack.Navigator>
	);
}
