import { Entypo, Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
	Box,
	Center,
	Checkbox,
	HStack,
	Heading,
	Text,
	Input,
	Icon,
	IconButton,
	VStack,
} from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { HomeStackParams } from '../../navigation/home_stack';
import { supabase } from '../../services/supabase';

type Props = NativeStackScreenProps<HomeStackParams, 'List'>;

export default function List({ navigation, route }: Props) {
	const params = route.params;
	// TODO: Add type supabase
	const initList = useRef<any[]>([]);
	const copyList = useRef<any[]>([]);
	const [list, setList] = useState<any[]>([]);
	const [item, setItem] = useState<string>('');
	// const copyList = list;
	useEffect(() => {
		navigation.addListener('focus', () => {
			getListByGroup();
		});

		return () => {
			// saveList(initList.current, copyList.current);
			// console.log(copyList.current);
		};
	}, []);

	const getListByGroup = async () => {
		const response = await supabase
			.from('list')
			.select('*')
			.eq('user_id', route.params.user_id)
			.eq('group_id', route.params.card_id);
		if (response.data) {
			initList.current = [...response.data];
			copyList.current = [...response.data];
			setList(response.data);
		}

		return response.data;
	};

	const saveList = async (initList: any[], newList: any[]) => {
		// Check changes
		console.log('Init list', JSON.stringify(initList));
		console.log('\nCopy list', JSON.stringify(newList));
		if (JSON.stringify(initList) != JSON.stringify(newList)) {
			// Delete items
			console.log('Deleting...');
			const responseDelete = await supabase
				.from('list')
				.delete()
				.eq('user_id', route.params.user_id)
				.eq('group_id', route.params.card_id);
			console.log(responseDelete);
			if (!responseDelete.error) {
				console.log('\nInserting...');
				// Create items
				const responseInsert = await supabase.from('list').insert(newList);
				console.log(responseInsert);
			}
		}
	};

	const addItem = (item: any) => {
		if (item === '') return;

		setItem('');
		setList((prevList) => {
			const newList = [
				...prevList,
				{
					user_id: route.params.user_id,
					group_id: route.params.card_id,
					item: item,
					is_completed: false,
				},
			];

			copyList.current = [...newList];

			// console.log(
			// 	JSON.stringify(initList.current) != JSON.stringify(copyList.current),
			// );
			return newList;
		});
	};

	const handleDelete = (index: number) => {
		setList((prevList) => {
			const newList = prevList.filter((_, itemI) => itemI !== index);
			copyList.current = [...newList];
			return newList;
		});
	};

	const handleStatusChange = (index: number) => {
		setList((prevList) => {
			// console.log(prevList);

			const newList = [...prevList];
			newList[index].is_completed = !newList[index].is_completed;

			// copyList.current = [...newList];
			return newList;
		});
	};

	return (
		<Center w="100%" mt={10}>
			<Box maxW="300" w="100%">
				<Heading mb="2" size="md">
					{params.card_name}
				</Heading>
				<VStack space={4}>
					<HStack space={2}>
						<Input
							flex={1}
							onChangeText={setItem}
							value={item}
							placeholder="Add Item"
						/>
						<IconButton
							borderRadius="sm"
							variant="solid"
							icon={
								<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />
							}
							onPress={() => addItem(item)}
						/>
					</HStack>
					<VStack space={2}>
						{list.map((item, index) => (
							<HStack
								w="100%"
								justifyContent="space-between"
								alignItems="center"
								key={index}
							>
								<Checkbox
									isChecked={item.is_completed}
									aria-label="checkbox"
									onChange={() => handleStatusChange(index)}
									value={item.is_completed}
								/>
								<Text
									width="100%"
									flexShrink={1}
									textAlign="left"
									mx="2"
									strikeThrough={item.is_completed}
									_light={{
										color: item.is_completed ? 'gray.400' : 'coolGray.800',
									}}
									onPress={() => handleStatusChange(index)}
								>
									{item.item}
								</Text>
								<IconButton
									size="sm"
									colorScheme="trueGray"
									icon={
										<Icon
											as={Entypo}
											name="minus"
											size="xs"
											color="trueGray.400"
										/>
									}
									onPress={() => handleDelete(index)}
								/>
							</HStack>
						))}
					</VStack>
				</VStack>
			</Box>
		</Center>
	);
}
