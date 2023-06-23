import { supabase } from './supabase';
import { AuthResponse, AuthTokenResponse } from '@supabase/supabase-js';

export default class AuthService {
	static async signIn(
		email: string,
		password: string,
	): Promise<AuthTokenResponse> {
		const response = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		return response;
	}

	static async signUp(
		name: string,
		email: string,
		password: string,
	): Promise<AuthResponse> {
		const response = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: { first_name: name },
			},
		});
		return response;
	}

	static async signOut() {
		supabase.auth.signOut();
	}
}
