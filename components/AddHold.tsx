import React from 'react';
import { List } from 'react-native-paper';
import { ViewStyle } from 'react-native';
import AppTheme from '../Theme';
import HoldInputModal from './HoldInputModal';
import { Hold } from '../types';

interface AddListItemProps {
	listFunctions: {
		updateExisting: (key: number, newValue: Hold) => void;
		addNew: (value: Hold) => void;
	};
}

const commonStyles: Partial<ViewStyle> = {
	backgroundColor: AppTheme.colors.accent,
	borderBottomColor: AppTheme.colors.border,
	borderBottomWidth: 1,
};

const AddListItem: React.FC<AddListItemProps> = ({ listFunctions }) => {
	const [adding, setAdding] = React.useState<boolean>(false);

	const stopAdding = () => setAdding(false);

	return !adding ? (
		<List.Item
			title={`Add new hold`}
			onPress={() => setAdding(true)}
			right={() => <List.Icon icon={'plus'} />}
			style={{ ...commonStyles }}
		/>
	) : (
		<HoldInputModal
			closeModal={stopAdding}
			colour={AppTheme.colors.backdrop}
			name={'Hold name'}
			index={-1}
			onSubmit={listFunctions}
			visible={true}
			kind={'add'}
		/>
	);
};

export default AddListItem;
