import * as React from 'react';
import { List, Text } from 'react-native-paper';

import PlayerListItem from '../components/PlayerListItem';
import ColourListItem from '../components/ColourListItem';
import AddListItem from '../components/AddListItem';
import { AppContext } from '../App';
import { removeFromGenericList } from '../util';
import { Hold } from '../types';

const TabTwoScreen = () => {
    const {
        playerList,
        setPlayerList,
        holdList,
        setHoldList,
    } = React.useContext(AppContext);

    if (!setPlayerList || !setHoldList)
        throw new Error('required state action(s) not provided in context');

    const addToPlayerList = (value: string) =>
        setPlayerList(playerList.concat([value]));

    const updateValueInPlayerList = (key: number, newValue: string) =>
        setPlayerList(
            playerList.map((value, index) =>
                index === key ? newValue : value,
            ),
        );

    return (
        <>
            <List.Accordion
                title={<Text style={{ fontWeight: 'bold' }}>{'Players'}</Text>}
            >
                {playerList.map((player, index) => (
                    <PlayerListItem
                        name={player}
                        key={index}
                        index={index}
                        removeFromList={removeFromGenericList<string>(
                            setPlayerList,
                            playerList,
                        )}
                        editValue={updateValueInPlayerList}
                    />
                ))}
                <AddListItem type={'player'} addFunction={addToPlayerList} />
            </List.Accordion>
            <List.Accordion
                title={<Text style={{ fontWeight: 'bold' }}>{'Holds'}</Text>}
            >
                {holdList.map((hold, index) => (
                    <ColourListItem
                        name={hold.name}
                        background={hold.colour}
                        index={index}
                        key={index}
                        removeFromList={removeFromGenericList<Hold>(
                            setHoldList,
                            holdList,
                        )}
                    />
                ))}
            </List.Accordion>
        </>
    );
};

export default TabTwoScreen;
