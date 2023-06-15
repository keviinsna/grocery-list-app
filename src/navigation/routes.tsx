// React-Native
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// Screens
import FoodTab from '../screens/foods';
import DrinksTab from '../screens/drinks';
import CleaningTab from '../screens/cleanings';
import UtilitiesTab from '../screens/utilities';

export default function StackNavigation() {
	const insets = useSafeAreaInsets();
	const Tab = createMaterialTopTabNavigator();
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="FoodTab"
				style={{ marginTop: insets.top }}
			>
				<Tab.Screen
					name="FoodTab"
					component={FoodTab}
					options={{ tabBarLabel: 'Foods' }}
				/>
				<Tab.Screen
					name="DrinksTab"
					component={DrinksTab}
					options={{ tabBarLabel: 'Drinks' }}
				/>
				<Tab.Screen
					name="CleaningTab"
					component={CleaningTab}
					options={{ tabBarLabel: 'Cleaning' }}
				/>
				<Tab.Screen
					name="UtilitiesTab"
					component={UtilitiesTab}
					options={{ tabBarLabel: 'Utilities' }}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
