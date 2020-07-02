import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { SetStateAction, Dispatch } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Colour } from "./types";
import defaultAppState from "./config/defaultAppState";

interface AppContextType {
    playerList: string[];
    setPlayerList?: Dispatch<SetStateAction<string[]>>;
    colours: Colour[];
    setColours?: Dispatch<SetStateAction<Colour[]>>;
}

export const AppContext = React.createContext<AppContextType>(defaultAppState);

const App = () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [playerList, setPlayerList] = React.useState<string[]>(
        defaultAppState.playerList,
    );
    const [colours, setColours] = React.useState<Colour[]>(
        defaultAppState.colours,
    );

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <AppContext.Provider
                    value={{ playerList, colours, setPlayerList, setColours }}
                >
                    <Navigation colorScheme={colorScheme} />
                </AppContext.Provider>
                <StatusBar />
            </SafeAreaProvider>
        );
    }
};
export default App;
