import React from 'react';
import { Button, Surface, Divider, Text } from 'react-native-paper';
import * as R from 'ramda';

import { getRandomInt } from '../util';
import { FlatList } from 'react-native-gesture-handler';
import { AppContext } from '../App';

type State = 'playing' | 'ready';

const getText = (state: State) =>
    ({ playing: 'now playing', ready: 'hit the play button to start' }[state]);

const DEFAULT_BACKGROUND = '#FF0000';

const TabOneScreen = () => {
    const { playerList, holdList } = React.useContext(AppContext);
    const [state, setState] = React.useState<State>('ready');
    const [currentHold, setCurrentHold] = React.useState<string>(
        DEFAULT_BACKGROUND,
    );
    const [currentPlayerIndex, setCurrentPlayer] = React.useState<number>(0);
    const [intervalToClear, setIntervalToClear] = React.useState<
        NodeJS.Timeout
    >();

    const play = () => {
        return setInterval(() => {
            setCurrentHold(holdList[getRandomInt(holdList.length)].colour);
            setCurrentPlayer((currentPlayerIndex) =>
                currentPlayerIndex < playerList.length - 1
                    ? currentPlayerIndex + 1
                    : 0,
            );
        }, 1000);
    };
    const startPlaying = R.pipe(play, setIntervalToClear, () =>
        setState('playing'),
    );

    const stopPlaying = () => {
        intervalToClear && clearInterval(intervalToClear);
        setState('ready');
        setCurrentHold(DEFAULT_BACKGROUND);
    };

    return (
        <>
            <Text>Player : {playerList[currentPlayerIndex]}</Text>
            <Button
                icon={'play-box-outline'}
                onPress={state === 'ready' ? startPlaying : stopPlaying}
            >
                {state === 'playing' ? 'STOP' : 'PLAY'}
            </Button>
            <Surface
                style={{
                    height: '20%',
                    backgroundColor: `${currentHold}`,
                }}
            >
                <Divider />
            </Surface>
            <Text>{getText(state)}</Text>
            <Text>Players:</Text>
            <FlatList
                data={playerList}
                renderItem={({ item, index }) => (
                    <Text key={index}>{item}</Text>
                )}
            />
        </>
    );
};

export default TabOneScreen;
