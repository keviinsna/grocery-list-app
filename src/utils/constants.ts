interface Status {
	error: 'error';
	info: 'info';
	warning: 'warning';
	success: 'success';
}
export default class Constants {
	static readonly AUTH_ERROR = 'Auth Error';
	static readonly SUCCESS = 'Success';
	static readonly STATUS: Status = {
		error: 'error',
		info: 'info',
		warning: 'warning',
		success: 'success',
	};
}
