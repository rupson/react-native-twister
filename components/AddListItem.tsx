import React from 'react';
import { List, TextInput } from 'react-native-paper';

interface AddListItemProps {
    type: 'hold' | 'player';
    addFunction: (value: any) => any; //@TODO: remove any types
}
const AddListItem: React.FC<AddListItemProps> = ({ type, addFunction }) => {
    const [adding, setAdding] = React.useState<boolean>(false);

    const stopAdding = () => setAdding(false);

    return !adding ? (
        <List.Item
            title={`Add new ${type}`}
            onPress={() => setAdding(true)}
            right={() => <List.Icon icon={'plus'} />}
            style={{
                borderBottomWidth: 1,
                borderBottomColor: '#e5e5e5',
                backgroundColor: '#ececec',
            }}
            accessibilityStates
        />
    ) : (
        <TextInput
            placeholder={`${type} name`}
            mode={'outlined'}
            onBlur={stopAdding}
            autoFocus={true}
            onSubmitEditing={({ nativeEvent: { text } }) => {
                addFunction(text);
            }}
            accessibilityStates
        />
    );
};

export default AddListItem;
