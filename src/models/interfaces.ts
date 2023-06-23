import { IToastProps } from 'native-base';

// User
export interface User {
	name: string;
	email: string;
	password: string;
}

export interface RegisterUser extends User {
	confirm_password: string;
}

export const emptyUser: RegisterUser = {
	name: '',
	email: '',
	password: '',
	confirm_password: '',
};

export interface toastProps {
	show: (props: IToastProps) => any;
	close: (id: any) => void;
	closeAll: () => void;
	isActive: (id: any) => boolean;
}

export type toastStatus = 'info' | 'warning' | 'success' | 'error';
