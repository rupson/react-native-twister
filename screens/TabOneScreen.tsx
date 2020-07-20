import React from 'react';
import { Text, Headline } from 'react-native-paper';
import * as R from 'ramda';

import { getRandomInt, removeFromGenericList } from '../util';
import { AppContext } from '../App';
import {
    PrimaryButton,
    SecondaryButton,
    LargeIconButton,
} from '../components/Buttons';
import { Box } from '../components/Box';
import { View, FlatList } from 'react-native';
import CurrentHold from '../components/CurrentHold';

type State = 'playing' | 'ready';

const TabOneScreen = () => {
    const { playerList, holdList, setPlayerList } = React.useContext(
        AppContext,
    );
    const [state, setState] = React.useState<State>('ready');
    const [currentHold, setCurrentHold] = React.useState<string>(
        holdList[0].colour,
    );
    const [currentPlayerIndex, setCurrentPlayer] = React.useState<number>(0);

    if (!setPlayerList)
        throw new Error('required state action(s) not provided in context');

    const startPlaying = () => {
        setState('playing');
        setCurrentHold(holdList[getRandomInt(holdList.length)].colour);
        setCurrentPlayer(0);
    };

    const nextTurn = () => {
        setCurrentHold(holdList[getRandomInt(holdList.length)].colour);
        setCurrentPlayer((currentPlayerIndex) =>
            currentPlayerIndex < playerList.length - 1
                ? currentPlayerIndex + 1
                : 0,
        );
    };

    const playerOut = R.pipe(
        removeFromGenericList<string>(setPlayerList, playerList),
        nextTurn,
    );

    return (
        <Box flex={1}>
            {state === 'playing' ? (
                <>
                    <SecondaryButton
                        icon={'stop-circle-outline'}
                        text={'Stop game'}
                        onPress={() => setState('ready')}
                    />
                    <Box flex={1} justifyContent={'space-evenly'}>
                        <View>
                            <Headline style={{ textAlign: 'center' }}>
                                {playerList[currentPlayerIndex]}
                            </Headline>
                            <CurrentHold colour={currentHold} />
                        </View>
                        <View
                            style={{
                                flex: 0.5,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                }}
                            >
                                <LargeIconButton
                                    onPress={() =>
                                        playerOut(currentPlayerIndex)
                                    }
                                    icon={'skull-crossbones-outline'}
                                />
                                <LargeIconButton
                                    onPress={nextTurn}
                                    icon={'fast-forward'}
                                />
                            </View>
                        </View>
                    </Box>
                </>
            ) : (
                <PrimaryButton
                    text={'PLAY'}
                    icon={'play-box-outline'}
                    onPress={startPlaying}
                />
            )}

            {/**
             * Hiding the list of players for now as it seems surplus to requirements
             * but super useful for debugging so don't want to delete it rn.
             */}
            {false && (
                <Box flex={1}>
                    <Text style={{ textAlign: 'center' }}>Players:</Text>
                    <FlatList
                        data={playerList}
                        renderItem={({ item, index }) => (
                            <Text key={index} style={{ textAlign: 'center' }}>
                                {item}
                            </Text>
                        )}
                    />
                </Box>
            )}
        </Box>
    );
};

export default TabOneScreen;
