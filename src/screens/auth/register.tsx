// React & React-Native
import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { Alert, StyleSheet, View } from 'react-native';
// Services
import AuthService from '../../services/auth';
// Interfaces
import { User, emptyUser } from '../../models/interfaces';

export default function Register() {
	const [user, setUser] = useState<User>(emptyUser);
	const [loading, setLoading] = useState(false);

	const signIn = async () => {
		setLoading(true);
		const { error } = await AuthService.signIn(user.email, user.password);
		if (error) Alert.alert(error.message);
		setLoading(false);
	};

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
		<View style={styles.container}>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Input
					label="Name"
					leftIcon={{ type: 'font-awesome', name: 'envelope' }}
					onChangeText={(name) => setUser({ ...user, name: name })}
					value={user.name}
					placeholder="email@address.com"
					autoCapitalize={'none'}
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Input
					label="Email"
					leftIcon={{ type: 'font-awesome', name: 'envelope' }}
					onChangeText={(email) => setUser({ ...user, email: email })}
					value={user.email}
					placeholder="email@address.com"
					autoCapitalize={'none'}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Password"
					leftIcon={{ type: 'font-awesome', name: 'lock' }}
					onChangeText={(password) => setUser({ ...user, password: password })}
					value={user.password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={'none'}
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button title="Sign in" disabled={loading} onPress={() => signIn()} />
			</View>
			<View style={styles.verticallySpaced}>
				<Button title="Sign up" disabled={loading} onPress={() => signUp()} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
});
