import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { supabase } from '../../services/supabase';
import { User } from '@supabase/supabase-js';
import {
	Box,
	Checkbox,
	Divider,
	HStack,
	Heading,
	Stack,
	Pressable,
	Text,
	VStack,
} from 'native-base';
import { CardSkeleton } from '../../components/CardSkeleton';
import { HomeStackParams } from '../../navigation/home_stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Group, List } from '../../models/supabase_models';

type Props = NativeStackScreenProps<HomeStackParams, 'Home'>;
interface ListGroup {
	group: string;
	group_id: number;
	list: List[];
}
export default function HomeScreen({ navigation, route }: Props) {
	const [user, setUser] = useState<User>();
	const [groups, setGroups] = useState<ListGroup[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		const list = route.params?.list;
		if (list) {
			const groupId = route.params?.group_id;
			setGroups((prev) => {
				const groupName = prev.find((g) => g.group_id == groupId)?.group;
				const newList = prev.filter((g) => g.group_id != groupId);
				const _listGroup: ListGroup = {
					group_id: groupId,
					group: groupName as string,
					list: list.slice(0, 5),
				};

				newList.push(_listGroup);
				return newList.sort((g1, g2) => g1.group_id - g2.group_id);
			});
		}
	}, [route.params?.list]);

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

	const getUser = async (): Promise<User | undefined> => {
		const session = await supabase.auth.getSession();
		if (session.data.session?.user) {
			setUser(session.data.session?.user);
			return session.data.session?.user;
		}
	};
	const getList = async (user: User): Promise<List[]> => {
		const response = await supabase
			.from('list')
			.select('*')
			.eq('user_id', user.id);
		const list: List[] = response.data ?? [];
		return list;
	};

	const getGroups = async (): Promise<Group[]> => {
		const response = await supabase.from('groups').select('*');
		const groups: Group[] = response.data ?? [];
		return groups;
	};

	const groupByCategories = (list: List[], groups: Group[]) => {
		const grouped: ListGroup[] = groups.map((g) => {
			const listByCategory = list
				.filter((item) => item.group_id == g.id)
				.slice(0, 5);
			return {
				group_id: g.id,
				group: g.group,
				list: listByCategory,
			} as ListGroup;
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
					<HStack
						space={4}
						px={2}
						justifyContent="center"
						w="50%"
						mt={2}
						mb={4}
					>
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
											{({ isHovered, isPressed }) => {
												return (
													<Box
														rounded="lg"
														borderColor="coolGray.200"
														borderWidth="1"
														bg={
															isPressed
																? 'coolGray.100'
																: isHovered
																? 'coolGray.200'
																: 'white'
														}
														style={{
															transform: [
																{
																	scale: isPressed ? 0.96 : 1,
																},
															],
														}}
													>
														<GroupCard comp={comp} />
													</Box>
												);
											}}
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
													card_name: comp.group,
													user_id: user?.id as string,
												})
											}
										>
											{({ isHovered, isPressed }) => {
												return (
													<Box
														rounded="lg"
														borderColor="coolGray.200"
														borderWidth="1"
														bg={
															isPressed
																? 'coolGray.100'
																: isHovered
																? 'coolGray.200'
																: 'white'
														}
														style={{
															transform: [
																{
																	scale: isPressed ? 0.96 : 1,
																},
															],
														}}
													>
														<GroupCard comp={comp} />
													</Box>
												);
											}}
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

function GroupCard({ comp }: { comp: ListGroup }) {
	const colors = {
		azul: 'primary.200',
		vermelho: 'red.200',
		rosa: 'secondary.200',
		verde: 'tertiary.200',
		laranja: 'warming.200',
		roxo: 'purple.200',
		amarelo: 'amber.200',
		azulClaro: 'indigo.200',
	};
	const getColor = () => {
		const colorArray = Object.keys(colors);
		const aleatoryColor =
			colorArray[Math.floor(Math.random() * colorArray.length)];
		// @ts-ignore
		return colors[aleatoryColor];
	};
	return (
		<Stack p="4" space={3} w="100%" px={3} minW="150">
			<Stack space={2} alignItems="center">
				<Heading size="lg">{comp.group}</Heading>
			</Stack>
			<Divider />
			{comp.list.map((c: List, index: number) => {
				return (
					<VStack key={index} w="100%" px={2}>
						<HStack>
							<Checkbox
								isChecked={c.is_completed}
								aria-label="checkbox"
								value={`${c.is_completed}`}
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
			})}
		</Stack>
	);
}
