import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { View, ViewStyle } from 'react-native';
import { colours } from '../Theme';

const commonStyles: Partial<ViewStyle> = {
    backgroundColor: colours.lavenderBlue,
    borderBottomColor: colours.gunmetal,
    borderBottomWidth: 1,
};

interface PlayerListItemProps {
    name: string;
    colour: string;
    index: number;
    removeFromList: (value: any) => any;
}

const Item: React.FC<PlayerListItemProps> = ({
    name,
    colour,
    index,
    removeFromList,
}) => (
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

                <IconButton icon={'playlist-edit'} />

                <IconButton
                    icon={'minus-circle-outline'}
                    onPress={() => removeFromList(index)}
                />
            </>
        )}
        style={{ ...commonStyles }}
    />
);

export default Item;
