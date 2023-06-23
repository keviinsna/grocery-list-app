// React & React-Native
import { useState, useEffect } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Supabase
import 'react-native-url-polyfill/auto';
import { Session } from '@supabase/supabase-js';
// Navigation
// Service
import { supabase } from './src/services/supabase';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './src/navigation/home_stack';
import AuthStack from './src/navigation/auth_stack';

export default function App() {
	const [session, setSession] = useState<Session | null>(null);
	const theme = extendTheme({});
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<SafeAreaProvider>
			<NativeBaseProvider theme={theme}>
				<NavigationContainer>
					{session && session.user ? <HomeStack /> : <AuthStack />}
				</NavigationContainer>
			</NativeBaseProvider>
		</SafeAreaProvider>
	);
}
