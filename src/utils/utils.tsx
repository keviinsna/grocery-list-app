import { IToastProps } from 'native-base';
import { ToastAlert } from '../components/ToastAltert';
import { toastProps, toastStatus } from '../models/interfaces';

export function showMessage(
	toast: toastProps,
	title: string,
	status: toastStatus,
	message: string,
) {
	const details: IToastProps = {
		placement: 'top',
		render: ({ id }) => (
			<ToastAlert
				status={status}
				description={message}
				title={title}
				toast={toast}
				id={id}
			/>
		),
	};
	toast.show(details);
}
