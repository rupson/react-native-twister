import React from "react";
import { StyleSheet, Button } from "react-native";
import * as R from "ramda";

import { Text, View } from "../components/Themed";
import { getRandomInt } from "../util";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList, TabOneParamList } from "../types";
import { FlatList } from "react-native-gesture-handler";
import { AppContext } from "../App";

type State = "playing" | "ready";

const getText = (state: State) =>
    ({ playing: "now playing", ready: "hit the play button to start" }[state]);

const DEFAULT_BACKGROUND = "#FFFFFF";

const TabOneScreen = () => {
    const [state, setState] = React.useState<State>("ready");
    const [currentColour, setCurrentColour] = React.useState<string>(
        DEFAULT_BACKGROUND,
    );

    const { playerList, colours } = React.useContext(AppContext);
    const [intervalToClear, setIntervalToClear] = React.useState<
        NodeJS.Timeout
    >();

    const play = () => {
        return setInterval(
            () => setCurrentColour(colours[getRandomInt(colours.length)].code),
            1000,
        );
    };
    const startPlaying = R.pipe(play, setIntervalToClear, () =>
        setState("playing"),
    );

    const stopPlaying = () => {
        intervalToClear && clearInterval(intervalToClear);
        setState("ready");
        setCurrentColour(DEFAULT_BACKGROUND);
    };

    return (
        <View
            style={{ ...styles.container, backgroundColor: `${currentColour}` }}
        >
            <Button
                title={state === "playing" ? "STOP" : "PLAY"}
                onPress={state === "ready" ? startPlaying : stopPlaying}
            />
            <Text style={styles.title}>{getText(state)}</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text>Players:</Text>
            <FlatList
                data={playerList}
                renderItem={({ item, index }) => (
                    <Text key={index}>{item}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});

export default TabOneScreen;
