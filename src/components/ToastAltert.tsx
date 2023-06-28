import {
	Alert,
	HStack,
	VStack,
	Text,
	IconButton,
	CloseIcon,
} from 'native-base';
import { toastProps, toastStatus } from '../models/interfaces';

interface ToastAlertProps {
	id: number;
	toast: toastProps;
	status: toastStatus;
	title: string;
	description: string;
}

export function ToastAlert({
	id,
	toast,
	status,
	title,
	description,
}: ToastAlertProps) {
	return (
		<Alert
			maxWidth="95%"
			alignSelf="center"
			flexDirection="row"
			status={status}
		>
			<VStack space={1} flexShrink={1} w="100%">
				<HStack
					flexShrink={1}
					alignItems="center"
					justifyContent="space-between"
				>
					<HStack space={2} flexShrink={1} alignItems="center">
						<Alert.Icon />
						<Text fontSize="md" fontWeight="medium" flexShrink={1}>
							{title}
						</Text>
					</HStack>
					<IconButton
						variant="unstyled"
						icon={<CloseIcon size="3" />}
						onPress={() => toast.close(id)}
					/>
				</HStack>
				<Text px="6">{description}</Text>
			</VStack>
		</Alert>
	);
}
