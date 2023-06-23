import {
	REACT_NATIVE_SUPABASE_URL,
	REACT_NATIVE_SUPABASE_ANON_KEY,
} from '@env';
import { createClient } from '@supabase/supabase-js';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => getItemAsync(key),
	setItem: (key: string, value: string) => setItemAsync(key, value),
	removeItem: (key: string) => deleteItemAsync(key),
};

const supabaseUrl = REACT_NATIVE_SUPABASE_URL;
const supabaseAnonKey = REACT_NATIVE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: ExpoSecureStoreAdapter as any,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
