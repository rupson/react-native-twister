import * as React from 'react';
import { List, Title, FAB } from 'react-native-paper';

import PlayerListItem from '../components/PlayerListItem';
import ColourListItem from '../components/ColourListItem';
import AddPlayer from '../components/AddPlayer';
import AddHold from '../components/AddHold';
import { AppContext } from '../App';
import { removeFromGenericList, updateGenericList } from '../util';
import { Hold, RootStackParamList } from '../types';
import { Box, BoxWithScrolling } from '../components/Box';
import AppTheme from '../Theme';
import { StackScreenProps } from '@react-navigation/stack';

const TabTwoScreen: React.FC<StackScreenProps<RootStackParamList, 'Setup'>> = ({
    navigation,
}) => {
    const [canStartGame, setCanStartGame] = React.useState<boolean>(false);

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

    const submitHoldModal = {
        updateExisting: updateGenericList<Hold>(setHoldList, holdList),
        addNew: (value: Hold) => setHoldList(holdList.concat([value])),
    };

    React.useEffect(() => {
        setCanStartGame(playerList.length > 1 && holdList.length > 0);
    }, [playerList, holdList]);

    return (
        <Box flex={1} justifyContent={'space-between'} paddingTop={0}>
            <BoxWithScrolling
                flex={1}
                justifyContent={'flex-start'}
                paddingTop={0}
            >
                <List.Accordion
                    title={<Title>{'Players'}</Title>}
                    style={{
                        borderBottomColor: AppTheme.colors.primary,
                        borderBottomWidth: 1,
                        backgroundColor: AppTheme.colors.onSurface,
                    }}
                >
                    {playerList.map((player, index) => (
                        <PlayerListItem
                            name={player}
                            key={index}
                            index={index}
                            removeFromList={removeFromGenericList<string>(
                                setPlayerList,
                                playerList
                            )}
                            editValue={updateGenericList<string>(
                                setPlayerList,
                                playerList
                            )}
                        />
                    ))}
                    <AddPlayer addFunction={addToPlayerList} />
                </List.Accordion>
                <List.Accordion
                    title={<Title>{'Holds'}</Title>}
                    style={{
                        borderBottomColor: AppTheme.colors.primary,
                        borderBottomWidth: 1,
                        backgroundColor: AppTheme.colors.onSurface,
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
                                holdList
                            )}
                            listFunctions={submitHoldModal}
                        />
                    ))}
                    <AddHold listFunctions={submitHoldModal} />
                </List.Accordion>
            </BoxWithScrolling>
            {canStartGame && (
                <FAB
                    icon={'play'}
                    style={{
                        backgroundColor: AppTheme.colors.primary,
                        alignSelf: 'flex-end',
                        marginBottom: 10,
                        marginRight: 10,
                    }}
                    onPress={() => navigation.navigate('Play')}
                />
            )}
        </Box>
    );
};

export default TabTwoScreen;
