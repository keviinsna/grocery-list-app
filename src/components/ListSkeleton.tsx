import { Center, HStack, Skeleton, VStack } from 'native-base';

export function ListSkeleton() {
	return (
		<Center>
			<VStack w="100%" px={5} mt={10} space={5} rounded="md">
				<HStack space={2}>
					<Skeleton flex="9" rounded="sm" />
					<Skeleton flex="1" rounded="sm" startColor="purple.400" />
				</HStack>
				<HStack space="2" alignItems="center">
					<Skeleton size="5" rounded="full" />
					<Skeleton h={3} flex="9" rounded="sm" />
					<Skeleton size="5" rounded="sm" startColor="red.100" />
				</HStack>
				<HStack space="2" alignItems="center">
					<Skeleton size="5" rounded="full" />
					<Skeleton h={3} flex="9" rounded="sm" />
					<Skeleton size="5" rounded="sm" startColor="red.100" />
				</HStack>
				<HStack space="2" alignItems="center">
					<Skeleton size="5" rounded="full" />
					<Skeleton h={3} flex="9" rounded="sm" />
					<Skeleton size="5" rounded="sm" startColor="red.100" />
				</HStack>
				<HStack space="2" alignItems="center">
					<Skeleton size="5" rounded="full" />
					<Skeleton h={3} flex="9" rounded="sm" />
					<Skeleton size="5" rounded="sm" startColor="red.100" />
				</HStack>
				<HStack space="2" alignItems="center">
					<Skeleton size="5" rounded="full" />
					<Skeleton h={3} flex="9" rounded="sm" />
					<Skeleton size="5" rounded="sm" startColor="red.100" />
				</HStack>
			</VStack>
		</Center>
	);
}
