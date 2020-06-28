import React from "react";
import { StyleSheet, Button } from "react-native";

import { Text, View } from "../components/Themed";
import { getRandomInt } from "../util";

type Color = { name: string; code: string };

interface PlayScreenProps {
    colours: Color[];
}

type State = "playing" | "ready";

const getText = (state: State) =>
    ({ playing: "now playing", ready: "hit the play button to start" }[state]);

const defaultColours = [
    { name: "red", code: "#ff0000" },
    { name: "green", code: "#00ff00" },
    { name: "blue", code: "#0000ff" },
];
const DEFAULT_BACKGROUND = "#FFFFFF";
const TabOneScreen: React.FC<PlayScreenProps> = ({
    colours = defaultColours,
}) => {
    const [state, setState] = React.useState<State>("ready");
    const [currentColour, setCurrentColour] = React.useState<string>(
        DEFAULT_BACKGROUND,
    );
    const [intervalToClear, setIntervalToClear] = React.useState<
        NodeJS.Timeout
    >();

    // const toggleState = (interval: any) => {
    //     if (state === "ready") {
    //         setState("playing");
    //         setInterval(() => {
    //             console.log(">>> changing colour!");
    //             setCurrentColour(
    //                 colours[getRandomInt(colours.length - 1)].code,
    //             );
    //         }, 3000);
    //     }
    //     setState("ready");
    //     clearInterval(interval);
    //     return 0;
    // };

    const play = () => {
        return setInterval(
            () => setCurrentColour(colours[getRandomInt(colours.length)].code),
            1000,
        );
    };
    const startPlaying = () => {
        setIntervalToClear(play());
        setState("playing");
    };
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
