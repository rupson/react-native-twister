import React from "react";
import { List } from "react-native-paper";

interface PlayerListItemProps {
    name: string;
    background: string;
}

const Item: React.FC<PlayerListItemProps> = ({ name, background }) => (
    <List.Item
        title={name}
        style={{ backgroundColor: background }}
        accessibilityStates
    />
);

export default Item;
