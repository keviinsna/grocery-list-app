import StackNavigation from './src/navigation/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
	return (
		<SafeAreaProvider>
			<StackNavigation />
		</SafeAreaProvider>
	);
}
