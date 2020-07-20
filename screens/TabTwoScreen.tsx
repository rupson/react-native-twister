import * as React from 'react';
import { List, Title } from 'react-native-paper';

import PlayerListItem from '../components/PlayerListItem';
import ColourListItem from '../components/ColourListItem';
import AddListItem from '../components/AddListItem';
import { AppContext } from '../App';
import { removeFromGenericList } from '../util';
import { Hold } from '../types';
import { Box } from '../components/Box';
import { colours } from '../Theme';

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
        <Box flex={1} justifyContent={'flex-start'}>
            <List.Accordion
                title={<Title>{'Players'}</Title>}
                style={{
                    borderBottomColor: colours.spaceCadet,
                    borderBottomWidth: 1,
                    backgroundColor: colours.frenchLilac,
                }}
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
                title={<Title>{'Holds'}</Title>}
                style={{
                    borderBottomColor: colours.spaceCadet,
                    borderBottomWidth: 1,
                    backgroundColor: colours.frenchLilac,
                }}
            >
                {holdList.map((hold, index) => (
                    <ColourListItem
                        name={hold.name}
                        colour={hold.colour}
                        index={index}
                        key={index}
                        removeFromList={removeFromGenericList<Hold>(
                            setHoldList,
                            holdList,
                        )}
                    />
                ))}
            </List.Accordion>
        </Box>
    );
};

export default TabTwoScreen;
