// React & React-Native
import { useState } from 'react';
// Services
import AuthService from '../../services/auth';
// Interfaces
import { RegisterUser, emptyUser } from '../../models/interfaces';
// Native-Base
import {
	Box,
	Input,
	Center,
	VStack,
	Button,
	Heading,
	FormControl,
} from 'native-base';
import { Alert } from 'react-native';

export default function Register({ navigation }: any) {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<RegisterUser>(emptyUser);

	const signUp = async () => {
		setLoading(true);
		const { error } = await AuthService.signUp(
			user.name,
			user.email,
			user.password,
		);
		if (error) Alert.alert(error.message);
		setLoading(false);
	};

	return (
		<Center w="100%" style={{ flex: 1 }}>
			<Box safeArea py="10" w="85%">
				<Heading size="lg" fontWeight="600" color="coolGray.800">
					Welcome
				</Heading>
				<Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
					Sign up to continue!
				</Heading>
				<VStack space={3} mt="5">
					<FormControl>
						<FormControl.Label>Name</FormControl.Label>
						<Input
							onChangeText={(name: string) => setUser({ ...user, name: name })}
						/>
					</FormControl>
					<FormControl>
						<FormControl.Label>Email ID</FormControl.Label>
						<Input
							autoCapitalize="none"
							onChangeText={(email: string) =>
								setUser({ ...user, email: email })
							}
						/>
					</FormControl>
					<FormControl>
						<FormControl.Label>Password</FormControl.Label>
						<Input
							type="password"
							onChangeText={(password: string) =>
								setUser({ ...user, password: password })
							}
						/>
					</FormControl>
					<FormControl>
						<FormControl.Label>Confirm Password</FormControl.Label>
						<Input
							type="password"
							onChangeText={(password: string) =>
								setUser({ ...user, password: password })
							}
						/>
					</FormControl>
					<Button
						mt="2"
						colorScheme="indigo"
						onPress={signUp}
						isLoading={loading}
						spinnerPlacement="end"
						isLoadingText="Submitting"
					>
						Sign Up
					</Button>
				</VStack>
			</Box>
		</Center>
	);
}
