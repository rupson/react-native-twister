import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { AppContext } from "../App";

const mockedPlayerList = ["Player 1"];

export default function TabTwoScreen() {
    const { setPlayerList } = React.useContext(AppContext);
    if (!setPlayerList)
        throw new Error("no player list state action in context");

    setPlayerList(mockedPlayerList);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Setup</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
        </View>
    );
}

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
