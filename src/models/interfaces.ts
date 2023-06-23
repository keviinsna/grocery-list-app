// User
export interface User {
	name: string;
	email: string;
	password: string;
}

export const emptyUser: User = {
	name: '',
	email: '',
	password: '',
};
