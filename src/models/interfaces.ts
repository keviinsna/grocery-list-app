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
