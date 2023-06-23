import AuthService from '../../services/auth';
import { Button, Text, View } from 'react-native';
export default function Home() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home</Text>
			<Button title="Sign Out" onPress={AuthService.signOut} />
		</View>
	);
}
