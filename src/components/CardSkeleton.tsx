import { Center, Divider, HStack, Skeleton, VStack } from 'native-base';

export function CardSkeleton() {
	return (
		<HStack alignItems="center" m={4} space={3} px={5} height="100%">
			<VStack
				w="50%"
				space={5}
				rounded="md"
				borderWidth="1"
				_light={{ borderColor: 'coolGray.300' }}
			>
				<Skeleton />
				<Divider />
				<Skeleton.Text px="5" />
			</VStack>
			<VStack
				w="50%"
				space={5}
				rounded="md"
				borderWidth="1"
				h="400"
				_light={{ borderColor: 'coolGray.300' }}
			>
				<Skeleton />
				<Divider />
				<Skeleton.Text px="5" />
			</VStack>
		</HStack>
	);
}

// function Card
