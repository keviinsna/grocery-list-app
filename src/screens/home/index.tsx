import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { supabase } from '../../services/supabase';
import { User } from '@supabase/supabase-js';
import {
	Box,
	Divider,
	HStack,
	Heading,
	Pressable,
	Stack,
	Text,
	VStack,
} from 'native-base';
import { CardSkeleton } from '../../components/CardSkeleton';
import { HomeStackParams } from '../../navigation/home_stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<HomeStackParams, 'Home'>;

export default function Home({ navigation }: Props) {
	const [user, setUser] = useState<User>();
	const [groups, setGroups] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		getUser();
		getGroups();
	}, []);

	const getGroups = async () => {
		setLoading(true);
		const _groups = await supabase.from('groups').select('*');
		if (_groups.data) setGroups(_groups.data);
		setLoading(false);
		return _groups;
	};

	const getUser = async () => {
		const session = await supabase.auth.getSession();
		if (session.data.session?.user) setUser(session.data.session?.user);
	};

	return (
		<ScrollView>
			{loading ? (
				<CardSkeleton />
			) : (
				<Box bg="white" alignItems="center">
					<Heading p={3} mx={2}>
						Olá, {user?.user_metadata["first_name"]}
					</Heading>
					<HStack space={3} px={2} justifyContent="center" w="50%">
						<VStack space={4} alignItems="center" w="100%">
							{groups.map(
								(comp, index) =>
									index % 2 == 0 && (
										<Pressable
											key={index}
											onPress={() =>
												navigation.navigate('List', {
													card_id: comp.id,
													card_name: comp.group,
													user_id: user?.id as string,
												})
											}
										>
											<Box>
												<Group comp={comp} />
											</Box>
										</Pressable>
									),
							)}
						</VStack>
						<VStack space={4} alignItems="center">
							{groups.map(
								(comp, index) =>
									index % 2 != 0 && (
										<Pressable
											key={index}
											onPress={() =>
												navigation.navigate('List', {
													card_id: comp.id,
													card_name: comp.group,
													user_id: user?.id as string,
												})
											}
										>
											<Box>
												<Group comp={comp} />
											</Box>
										</Pressable>
									),
							)}
						</VStack>
					</HStack>
				</Box>
			)}
		</ScrollView>
	);
}

function Group({ comp }: any) {
	return (
		<Box
			rounded="lg"
			borderColor="coolGray.200"
			borderWidth="1"
			_light={{ backgroundColor: 'gray.50' }}
			w="100%"
			py={8}
			px={4}
		>
			<Stack p="4" space={3}>
				<Stack space={2} alignItems="center">
					<Heading size="lg">{comp.group}</Heading>
				</Stack>
				{/* <Divider />
				<Text fontWeight="400">
					Bengaluru (also called Bangalore) is the center of India's high-tech
					industry. The city is also known for its parks and nightlife.
				</Text> */}
			</Stack>
		</Box>
	);
}
