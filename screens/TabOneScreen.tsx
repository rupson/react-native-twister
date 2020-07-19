import React from "react";
import { Button, Surface, Divider, Text } from "react-native-paper";
import * as R from "ramda";

import { getRandomInt } from "../util";
import { FlatList } from "react-native-gesture-handler";
import { AppContext } from "../App";
import { PrimaryButton } from "../components/Buttons";
import { Box } from "../components/Box";

type State = "playing" | "ready";

const getText = (state: State) =>
  ({ playing: "now playing", ready: "hit the play button to start" }[state]);

const DEFAULT_BACKGROUND = "grey";

const TabOneScreen = () => {
  const { playerList, holdList } = React.useContext(AppContext);
  const [state, setState] = React.useState<State>("ready");
  const [currentHold, setCurrentHold] = React.useState<string>(
    DEFAULT_BACKGROUND
  );
  const [currentPlayerIndex, setCurrentPlayer] = React.useState<number>(0);
  const [intervalToClear, setIntervalToClear] = React.useState<
    NodeJS.Timeout
  >();

  const play = () => {
    return setInterval(() => {
      setCurrentHold(holdList[getRandomInt(holdList.length)].colour);
      setCurrentPlayer((currentPlayerIndex) =>
        currentPlayerIndex < playerList.length - 1 ? currentPlayerIndex + 1 : 0
      );
    }, 1000);
  };
  const startPlaying = R.pipe(play, setIntervalToClear, () =>
    setState("playing")
  );

  const stopPlaying = () => {
    intervalToClear && clearInterval(intervalToClear);
    setState("ready");
    setCurrentHold(DEFAULT_BACKGROUND);
  };

  return (
    <Box flex={3}>
      <Box flex={1}>
        <Text style={{ textAlign: "center" }}>
          Player : {playerList[currentPlayerIndex]}
        </Text>
        <Box flex={1} flexDirection={"row"}>
          <PrimaryButton
            text={state === "playing" ? "STOP" : "PLAY"}
            icon={"play-box-outline"}
            onPress={state === "ready" ? startPlaying : stopPlaying}
          />
        </Box>
      </Box>

      <Box flex={2}>
        <Surface
          style={{
            height: 50,
            backgroundColor: `${currentHold}`,
          }}
        >
          <Divider />
        </Surface>
        <Text style={{ textAlign: "center" }}>{getText(state)}</Text>
      </Box>

      <Box flex={1}>
        <Text style={{ textAlign: "center" }}>Players:</Text>
        <FlatList
          data={playerList}
          renderItem={({ item, index }) => (
            <Text key={index} style={{ textAlign: "center" }}>
              {item}
            </Text>
          )}
        />
      </Box>
    </Box>
  );
};

export default TabOneScreen;
