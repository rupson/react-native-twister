import React from 'react';
import { List, TextInput } from 'react-native-paper';
import { ViewStyle } from 'react-native';
import AppTheme from '../Theme';

interface AddListItemProps {
	addFunction: (value: string) => void;
}

const commonStyles: Partial<ViewStyle> = {
	backgroundColor: AppTheme.colors.accent,
	borderBottomColor: AppTheme.colors.border,
	borderBottomWidth: 1,
};

const AddListItem: React.FC<AddListItemProps> = ({ addFunction }) => {
	const [adding, setAdding] = React.useState<boolean>(false);

	const stopAdding = () => setAdding(false);

	return !adding ? (
		<List.Item
			title={`Add new player`}
			onPress={() => setAdding(true)}
			right={() => <List.Icon icon={'plus'} />}
			style={{ ...commonStyles }}
		/>
	) : (
		<TextInput
			placeholder={`Player name`}
			mode={'outlined'}
			onBlur={stopAdding}
			autoFocus={true}
			onSubmitEditing={({ nativeEvent: { text } }) => {
				addFunction(text);
			}}
			style={{ ...commonStyles }}
		/>
	);
};

export default AddListItem;
