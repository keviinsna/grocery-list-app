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
	useToast,
	ScrollView,
} from 'native-base';
// Utils
import C from '../../utils/constants';
import { showMessage } from '../../utils/utils';
import { AuthStackParams } from '../../navigation/auth_stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParams, 'Register'>;

export default function Register({ navigation }: Props) {
	const toast = useToast();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<RegisterUser>(emptyUser);

	const isFormValid = (): boolean => {
		const check =
			user.password == '' ||
			user.confirm_password == '' ||
			user.email == '' ||
			user.name == '' ||
			user.confirm_password != user.password;
		return check;
	};

	const signUp = async () => {
		setLoading(true);

		const { error } = await AuthService.signUp(
			user.name.trim(),
			user.email.trim(),
			user.password,
		);
		if (error) {
			showMessage(toast, C.AUTH_ERROR, C.STATUS.error, error.message);
		} else {
			showMessage(toast, C.SUCCESS, C.STATUS.success, 'Check your email');
			navigation.navigate('Login');
		}

		setLoading(false);
	};

	return (
		<>
			<Box safeArea px="7" py="6" w="85%">
				<Heading size="lg" fontWeight="600" color="coolGray.800">
					Welcome
				</Heading>
				<Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
					Sign up to continue!
				</Heading>
			</Box>
			<ScrollView>
				<Center>
					<VStack space={3} mt="5" w="85%" mb="5">
						<FormControl>
							<FormControl.Label>Name</FormControl.Label>
							<Input
								onChangeText={(name: string) =>
									setUser({ ...user, name: name })
								}
							/>
						</FormControl>
						<FormControl>
							<FormControl.Label>Email</FormControl.Label>
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
								onChangeText={(confirm_password: string) =>
									setUser({ ...user, confirm_password: confirm_password })
								}
							/>
						</FormControl>
						<Button
							mt="2"
							colorScheme="purple"
							onPress={signUp}
							isDisabled={isFormValid()}
							isLoading={loading}
							spinnerPlacement="end"
							isLoadingText="Submitting"
						>
							Sign Up
						</Button>
					</VStack>
				</Center>
			</ScrollView>
		</>
	);
}
