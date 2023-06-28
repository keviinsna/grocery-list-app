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
	VStack,
	Text,
	Checkbox,
	Button,
} from 'native-base';
import { CardSkeleton } from '../../components/CardSkeleton';
import { HomeStackParams } from '../../navigation/home_stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthService from '../../services/auth';

type Props = NativeStackScreenProps<HomeStackParams, 'Home'>;

export default function Home({ navigation }: Props) {
	const [user, setUser] = useState<User>();
	const [groups, setGroups] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		setLoading(true);
		const user = await getUser();
		if (user) {
			const [list, groups] = await Promise.all([getList(user), getGroups()]);
			if (list && groups) {
				const grouped = groupByCategories(list, groups);
				setGroups(grouped);
			}
		}
		setLoading(false);
	};

	const getUser = async () => {
		const session = await supabase.auth.getSession();
		if (session.data.session?.user) {
			setUser(session.data.session?.user);
			return session.data.session?.user;
		}
	};
	const getList = async (user: User) => {
		const response = await supabase
			.from('list')
			.select('*')
			.eq('user_id', user.id);
		return response.data;
	};

	const getGroups = async () => {
		const response = await supabase.from('groups').select('*');
		return response.data;
	};

	const groupByCategories = (list: any[], groups: any[]) => {
		const grouped = groups.map((g) => {
			const listByCategory = list
				.filter((item) => item.group_id == g.id)
				.slice(0, 5);
			return {
				group_id: g.id,
				group: g.group,
				list: listByCategory,
			};
		});
		return grouped;
	};

	return (
		<ScrollView>
			{loading ? (
				<CardSkeleton />
			) : (
				<Box bg="white" alignItems="center">
					<Heading p={3} mx={2}>
						Olá, {user?.user_metadata['first_name']}
					</Heading>
					<HStack space={4} px={2} justifyContent="center" w="50%">
						<VStack space={4} alignItems="center" w="100%">
							{groups.map(
								(comp, index) =>
									index % 2 == 0 && (
										<Pressable
											key={index}
											onPress={() =>
												navigation.navigate('List', {
													card_id: comp.group_id,
													card_name: comp.group,
													user_id: user?.id as string,
												})
											}
										>
											<Group comp={comp} />
										</Pressable>
									),
							)}
						</VStack>
						<VStack space={4} alignItems="center" w="100%">
							{groups.map(
								(comp, index) =>
									index % 2 != 0 && (
										<Pressable
											key={index}
											onPress={() =>
												navigation.navigate('List', {
													card_id: comp.group_id,
													card_name: comp.name,
													user_id: user?.id as string,
												})
											}
										>
											<Group comp={comp} />
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
		>
			<Stack p="4" space={3} w="100%" px={3} minW="150">
				<Stack space={2} alignItems="center">
					<Heading size="lg">{comp.group}</Heading>
				</Stack>
				<Divider />
				{/* {comp.list.map((c: any, index: number) => {
					return (
						<VStack key={index} w="100%" px={2}>
							<HStack>
								<Checkbox
									isChecked={c.is_completed}
									aria-label="checkbox"
									value={c.is_completed}
								/>
								<Text
									flexShrink={1}
									textAlign="left"
									mx="2"
									strikeThrough={c.is_completed}
									_light={{
										color: c.is_completed ? 'gray.400' : 'coolGray.800',
									}}
								>
									{c.item}
								</Text>
							</HStack>
						</VStack>
					);
				})} */}
			</Stack>
		</Box>
	);
}
