import React from 'react';
import { Text, Headline, List } from 'react-native-paper';
import * as R from 'ramda';

import { getRandomInt, removeFromGenericList, cloneArray } from '../util';
import { AppContext } from '../App';
import {
    PrimaryButton,
    SecondaryButton,
    LargeIconButton,
} from '../components/Buttons';
import { Box } from '../components/Box';
import { View, FlatList } from 'react-native';
import CurrentHold from '../components/CurrentHold';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

type State = 'playing' | 'ready' | 'game_over';

const TabOneScreen: React.FC<StackScreenProps<RootStackParamList, 'Play'>> = ({
    navigation,
}) => {
    const { playerList, holdList } = React.useContext(AppContext);

    /**
     * @TODO: This is a lot of state. Write a reducer.
     */
    const [state, setState] = React.useState<State>('ready');
    const [currentHold, setCurrentHold] = React.useState<string>(
        holdList[0].colour
    );
    const [currentPlayerIndex, setCurrentPlayer] = React.useState<number>(0);
    const [activePlayers, setActivePlayers] = React.useState<string[]>(
        cloneArray<string>(playerList)
    );
    const [maxPlayerIndex, setMaxIndex] = React.useState<number>(
        activePlayers.length - 1
    );
    const [turnCounter, setTurnCounter] = React.useState<number>(1);
    const [turnScores, setTurnScores] = React.useState<string[]>([]);

    const makeIndexAdjustment = () => {
        if (currentPlayerIndex >= activePlayers.length) {
            setCurrentPlayer(0);
        }
    };

    const isGameOver = () => {
        if (maxPlayerIndex < 2) {
            setState('game_over');
        }
    };

    React.useEffect(() => {
        isGameOver();
        makeIndexAdjustment();
    }, [activePlayers]);

    const startPlaying = () => {
        setState('playing');
        setCurrentHold(holdList[getRandomInt(holdList.length)].colour);
        setCurrentPlayer(0);
    };

    const stopPlaying = () => {
        setState('ready');
        navigation.navigate('Setup');
    };

    const nextTurn = () => {
        setCurrentHold(holdList[getRandomInt(holdList.length)].colour);
        setTurnCounter((turnCounter) =>
            currentPlayerIndex < maxPlayerIndex ? turnCounter : turnCounter + 1
        );
        setCurrentPlayer((currentPlayerIndex) =>
            currentPlayerIndex < maxPlayerIndex ? currentPlayerIndex + 1 : 0
        );
    };

    const playerOut = (index: number) => {
        // R.pipe(removeFromGenericList<string>(setActivePlayers, activePlayers))(
        //     index
        // );
        activePlayers.push(activePlayers.splice(index, 1)[0]);
        setMaxIndex(maxPlayerIndex - 1);
        isGameOver();
        setCurrentPlayer(currentPlayerIndex);
        setTurnScores(turnScores.concat([turnCounter.toString()]));
    };

    const formatText = (list: any[]) => {
        return list.reverse().join('\n');
    };

    return (
        <Box flex={1}>
            {
                {
                    ['playing']: (
                        <>
                            <SecondaryButton
                                icon={'stop-circle-outline'}
                                text={'Stop game'}
                                onPress={stopPlaying}
                            />
                            <Box flex={1} justifyContent={'space-evenly'}>
                                <View>
                                    <Headline style={{ textAlign: 'center' }}>
                                        {activePlayers[currentPlayerIndex]}
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
                                            //@TODO: this icon might be a bit too morbid haha
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
                    ),
                    ['ready']: (
                        <PrimaryButton
                            text={'PLAY'}
                            icon={'play-box-outline'}
                            onPress={startPlaying}
                        />
                    ),
                    ['game_over']: (
                        <>
                            <SecondaryButton
                                icon={'arrow-left-circle-outline'}
                                text={'Return to setup'}
                                onPress={stopPlaying}
                            />
                            <Box
                                flex={1}
                                justifyContent={'space-around'}
                                alignItems={'center'}
                                alignContent={'center'}
                            >
                                <Text style={{ fontSize: 40 }}>GAME OVER</Text>
                                <View
                                    style={{
                                        alignContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            textDecorationLine: 'underline',
                                            fontSize: 20,
                                        }}
                                    >
                                        Winner 🏆
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 30,
                                        }}
                                    >
                                        {activePlayers[0] +
                                            ' Won on turn ' +
                                            turnScores[turnScores.length - 1]}
                                    </Text>

                                    <View
                                        style={{
                                            height: '10%',
                                        }}
                                    />

                                    <Text
                                        style={{
                                            textDecorationLine: 'underline',
                                            fontSize: 20,
                                        }}
                                    >
                                        The Rest
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                            }}
                                        >
                                            {formatText(
                                                activePlayers.filter(
                                                    (_, index) => index !== 0
                                                )
                                            )}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                            }}
                                        >
                                            {formatText(
                                                turnScores.map(
                                                    (value) =>
                                                        '   Lost on round ' +
                                                        value
                                                )
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            </Box>
                        </>
                    ),
                }[state]
            }

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
