// React-Native
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Home from '../screens/home';
import List from '../screens/list';
import { Icon, IconButton } from 'native-base';
import AuthService from '../services/auth';
import { Entypo } from '@expo/vector-icons';

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
	const HomeHeader = (
		<IconButton
			size="md"
			variant="ghost"
			colorScheme="indigo"
			onPress={AuthService.signOut}
			icon={<Icon as={Entypo} name="log-out" />}
		/>
	);
	return (
		<Stack.Navigator screenOptions={{ title: '' }}>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{
					title: 'Grocery List App',
					headerTitleAlign: 'center',
					headerRight: () => HomeHeader,
				}}
			/>
			<Stack.Screen name="List" component={List} />
		</Stack.Navigator>
	);
}
