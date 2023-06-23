import AuthService from '../../services/auth';
import { Button, Text, View } from 'react-native';
export default function FoodTab() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Food Tab</Text>
			<Button title="Sign Out" onPress={AuthService.signOut} />
		</View>
	);
}
