import React from "react";
import { List } from "react-native-paper";

interface PlayerListItemProps {
    name: string;
}

const Item: React.FC<PlayerListItemProps> = ({ name }) => (
    <List.Item title={name} style={{ width: "100%" }} accessibilityStates />
);

export default Item;
