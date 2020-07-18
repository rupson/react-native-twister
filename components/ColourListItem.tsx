import React from 'react';
import { List, IconButton, Divider, Surface } from 'react-native-paper';

interface PlayerListItemProps {
    name: string;
    background: string;
    index: number;
    removeFromList: (value: any) => any;
}

const Item: React.FC<PlayerListItemProps> = ({
    name,
    background,
    index,
    removeFromList,
}) => (
    <List.Item
        title={name}
        right={() => (
            <>
                <Surface
                    style={{
                        width: '45%',
                        backgroundColor: background,
                    }}
                >
                    <Divider />
                </Surface>

                <IconButton icon={'playlist-edit'} />

                <IconButton
                    icon={'minus-circle-outline'}
                    onPress={() => removeFromList(index)}
                />
            </>
        )}
    />
);

export default Item;
