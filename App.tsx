import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { SetStateAction, Dispatch } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Hold } from "./types";
import defaultAppState from "./config/defaultAppState";

interface AppContextType {
    playerList: string[];
    setPlayerList?: Dispatch<SetStateAction<string[]>>;
    holdList: Hold[];
    setHoldList?: Dispatch<SetStateAction<Hold[]>>;
}

export const AppContext = React.createContext<AppContextType>(defaultAppState);

const App = () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [playerList, setPlayerList] = React.useState<string[]>(
        defaultAppState.playerList,
    );
    const [holdList, setHoldList] = React.useState<Hold[]>(
        defaultAppState.holdList,
    );

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <AppContext.Provider
                    value={{
                        playerList,
                        holdList,
                        setPlayerList,
                        setHoldList,
                    }}
                >
                    <PaperProvider theme={DefaultTheme}>
                        <Navigation colorScheme={colorScheme} />
                    </PaperProvider>
                </AppContext.Provider>
                <StatusBar />
            </SafeAreaProvider>
        );
    }
};
export default App;
