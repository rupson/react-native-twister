import React from 'react';
import { List, IconButton, TextInput } from 'react-native-paper';

interface PlayerListItemProps {
    name: string;
    index: number;
    removeFromList: (value: any) => any;
    editValue: (index: number, newValue: string) => any;
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
                borderBottomColor: '#e5e5e5',
                borderBottomWidth: 1,
            }}
            right={() => (
                <>
                    <IconButton
                        icon={'playlist-edit'}
                        onPress={() => setEditing(true)}
                        accessibilityStates
                    />

                    <IconButton
                        icon={'minus-circle-outline'}
                        onPress={() => removeFromList(index)}
                        accessibilityStates
                    />
                </>
            )}
            accessibilityStates
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
            accessibilityStates
        />
    );
};

export default Item;
