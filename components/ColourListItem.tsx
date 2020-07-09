import React from "react";
import { List, IconButton } from "react-native-paper";
import { View } from "./Themed";

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
                <View
                    style={{
                        width: '45%',
                        backgroundColor: background
                    }}
                />

                <IconButton
                    icon={'playlist-edit'}
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
);

export default Item;
