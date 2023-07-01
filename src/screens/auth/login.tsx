// React & React-Native
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView } from 'react-native';
// Services
import AuthService from '../../services/auth';
// Interfaces
import { User, emptyUser } from '../../models/interfaces';
import {
	Box,
	Link,
	Text,
	Input,
	Center,
	HStack,
	Button,
	VStack,
	Heading,
	useToast,
	FormControl,
	ScrollView,
} from 'native-base';
// Utils
import C from '../../utils/constants';
import { showMessage } from '../../utils/utils';
import { AuthStackParams } from '../../navigation/auth_stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParams, 'Login'>;

export default function Login({ navigation }: Props) {
	const toast = useToast();
	const [user, setUser] = useState<User>(emptyUser);
	const [loading, setLoading] = useState(false);

	const signIn = async () => {
		setLoading(true);
		const { error } = await AuthService.signIn(user.email, user.password);
		if (error) showMessage(toast, C.AUTH_ERROR, C.STATUS.error, error.message);
		setLoading(false);
	};

	return (
		<KeyboardAvoidingView behavior="height">
			<ScrollView>
				<Center mt={10}>
					<Image
						style={{
							width: 200,
							height: 200,
						}}
						source={require('../../assets/icons/logo-500-2.png')}
					/>
				</Center>
				<Box px="7">
					<Heading size="lg" fontWeight="600" color="coolGray.800">
						Welcome
					</Heading>
					<Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
						Sign in to continue!
					</Heading>
				</Box>
				<Center>
					<VStack space={3} mt="5" w="85%">
						<FormControl>
							<FormControl.Label>Email</FormControl.Label>
							<Input
								autoCapitalize="none"
								onChangeText={(email: string) =>
									setUser({ ...user, email: email.trim() })
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
							{/* <Link
							_text={{
								fontSize: 'xs',
								fontWeight: '500',
								color: 'indigo.500',
							}}
							alignSelf="flex-end"
							mt="1"
							>
							Forget Password?
						</Link> */}
						</FormControl>
						<Button
							mt="2"
							colorScheme="purple"
							onPress={signIn}
							isLoading={loading}
							spinnerPlacement="end"
							isLoadingText="Submitting"
						>
							Sign in
						</Button>
						<HStack mt="6" justifyContent="center">
							<Text fontSize="sm" color="coolGray.600">
								I'm a new user.{' '}
							</Text>
							<Link
								_text={{
									color: 'purple.600',
									fontWeight: 'medium',
									fontSize: 'sm',
								}}
								onPress={() => navigation.navigate('Register')}
							>
								Sign Up
							</Link>
						</HStack>
					</VStack>
				</Center>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
