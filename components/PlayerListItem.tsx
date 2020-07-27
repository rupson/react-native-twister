import React from 'react';
import { List, IconButton, TextInput } from 'react-native-paper';
import AppTheme from '../Theme';

interface PlayerListItemProps {
	name: string;
	index: number;
	removeFromList: (value: number) => void;
	editValue: (index: number, newValue: string) => void;
}

const Item: React.FC<PlayerListItemProps> = ({
	name,
	index,
	removeFromList,
	editValue,
}) => {
	const [_name, setName] = React.useState<string>(name);
	const [editing, setEditing] = React.useState<boolean>(false);
	return !editing ? (
		<List.Item
			title={name}
			style={{
				width: '100%',
				backgroundColor: AppTheme.colors.background,
				borderBottomWidth: 1,
				borderBottomColor: AppTheme.colors.border,
			}}
			right={() => (
				<>
					<IconButton icon={'playlist-edit'} onPress={() => setEditing(true)} />

					<IconButton
						icon={'minus-circle-outline'}
						onPress={() => removeFromList(index)}
					/>
				</>
			)}
		/>
	) : (
		<TextInput
			mode={'outlined'}
			value={_name}
			onBlur={() => setEditing(false)}
			onChangeText={(text) => setName(text)}
			autoFocus={true}
			onSubmitEditing={({ nativeEvent: { text } }) => {
				editValue(index, text);
			}}
			autoCorrect={false} //The inputs will be names so autocorrect is untrustworthy
		/>
	);
};

export default Item;
