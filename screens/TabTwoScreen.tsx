import * as React from 'react';
import { List, Text } from 'react-native-paper';

import PlayerListItem from '../components/PlayerListItem';
import ColourListItem from '../components/ColourListItem';
import AddListItem from '../components/AddListItem';
import { AppContext } from '../App';

const TabTwoScreen = () => {
    const { playerList, setPlayerList, colours } = React.useContext(AppContext);
    if (!setPlayerList)
        throw new Error('no player list state action in context');

    const addToPlayerList = (value: string) =>
        setPlayerList(playerList.concat([value]));

    const removeFromPlayerList = (key: number) =>
        setPlayerList(playerList.filter((_, index) => key !== index));

    const updateValueInPlayerList = (key: number, newValue: string) =>
        setPlayerList(
            playerList.map((value, index) =>
                index === key ? newValue : value,
            ),
        );

    return (
        <>
            <List.Accordion
                title={
                    <Text
                        style={{ fontWeight: 'bold', color: 'black' }}
                        accessibilityStates
                    >
                        {'Players'}
                    </Text>
                }
                style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}
            >
                {playerList.map((player, index) => (
                    <PlayerListItem
                        name={player}
                        key={index}
                        index={index}
                        removeFromList={removeFromPlayerList}
                        editValue={updateValueInPlayerList}
                    />
                ))}
                <AddListItem type={'player'} addFunction={addToPlayerList} />
            </List.Accordion>
            <List.Accordion
                title={
                    <Text
                        style={{ fontWeight: 'bold', color: 'black' }}
                        accessibilityStates
                    >
                        {'Holds'}
                    </Text>
                }
            >
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
};

export default TabTwoScreen;
