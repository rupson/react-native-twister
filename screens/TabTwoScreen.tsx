import * as React from "react";
import { List } from "react-native-paper";

import PlayerListItem from "../components/PlayerListItem";
import ColourListItem from "../components/ColourListItem";
import { AppContext } from "../App";

const mockedPlayerList = ["Player 1"];

export default function TabTwoScreen() {
    const { playerList, setPlayerList, colours } = React.useContext(AppContext);
    if (!setPlayerList)
        throw new Error("no player list state action in context");

    setPlayerList(mockedPlayerList);

    return (
        <>
            <List.Accordion title={"Players"} titleStyle={{ width: "100%" }}>
                {playerList.map((player, index) => (
                    <PlayerListItem name={player} key={index} />
                ))}
            </List.Accordion>
            <List.Accordion title={"Holds"} titleStyle={{ width: "100%" }}>
                {colours.map((colour, index) => (
                    <ColourListItem
                        name={colour.name}
                        background={colour.code}
                        key={index}
                    />
                ))}
            </List.Accordion>
        </>
    );
}
