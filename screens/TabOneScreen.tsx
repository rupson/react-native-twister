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
    holdList[0].colour,
  );
  const [currentPlayerIndex, setCurrentPlayer] = React.useState<number>(0);
  const [activePlayers, setActivePlayers] = React.useState<string[]>(
    cloneArray<string>(playerList),
  );

  const makeIndexAdjustment = () => {
    if (currentPlayerIndex >= activePlayers.length) {
      setCurrentPlayer(0);
    }
  };

  const isGameOver = () => {
    if (activePlayers.length < 2) {
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
    setCurrentPlayer((currentPlayerIndex) =>
      currentPlayerIndex < activePlayers.length - 1
        ? currentPlayerIndex + 1
        : 0,
    );
  };

  const playerOut = R.pipe(
    removeFromGenericList<string>(setActivePlayers, activePlayers),
  );

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
                      onPress={() => playerOut(currentPlayerIndex)}
                      //@TODO: this icon might be a bit too morbid haha
                      icon={'skull-crossbones-outline'}
                    />
                    <LargeIconButton onPress={nextTurn} icon={'fast-forward'} />
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
              >
                <Text style={{ fontSize: 40 }}>GAME OVER</Text>
                <View>
                  <Text
                    style={{ textDecorationLine: 'underline', fontSize: 20 }}
                  >
                    Winner 🏆
                  </Text>
                  <Text style={{ fontSize: 30, textAlign: 'center' }}>
                    {activePlayers[0]}
                  </Text>
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
