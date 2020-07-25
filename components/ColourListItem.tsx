import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { View, ViewStyle } from 'react-native';
import AppTheme from '../Theme';
import HoldInputModal from './HoldInputModal';
import { Hold } from '../types';

const commonStyles: Partial<ViewStyle> = {
	backgroundColor: AppTheme.colors.background,
	borderBottomColor: AppTheme.colors.border,
	borderBottomWidth: 1,
};

interface PlayerListItemProps {
	name: string;
	colour: string;
	index: number;
	removeFromList: (value: any) => any;
	updateValue: (key: number, newValue: Hold) => void;
}

const Item: React.FC<PlayerListItemProps> = (props) => {
	const { name, colour, index, removeFromList, updateValue } = props;

	const [editing, setEditing] = React.useState<boolean>(false);

	const closeModal = () => setEditing(false);
	return !editing ? (
		<List.Item
			title={name}
			right={() => (
				<>
					<View
						style={{
							width: '45%',
							backgroundColor: colour,
						}}
					></View>

					<IconButton icon={'playlist-edit'} onPress={() => setEditing(true)} />

					<IconButton
						icon={'minus-circle-outline'}
						onPress={() => removeFromList(index)}
					/>
				</>
			)}
			style={{ ...commonStyles }}
		/>
	) : (
		<HoldInputModal
			visible={true}
			closeModal={closeModal}
			{...props}
			onSubmit={updateValue}
		/>
	);
};

export default Item;
