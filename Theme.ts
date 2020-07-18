import { Theme as PaperTheme } from 'react-native-paper/lib/typescript/src/types';
import { Theme as NavigationTheme } from '@react-navigation/native';
import { DefaultTheme } from 'react-native-paper';
export const colours = {
    platinum: '#EAEAEA',
    lavenderBlue: '#CBC5EA',
    frenchLilac: '#73628A',
    spaceCadet: '#313D5A',
    gunmetal: '#183642',
    imperialRed: '#E63946',
};

const BaseTheme = {
    dark: false,
    colors: {
        background: colours.lavenderBlue,
        primary: colours.lavenderBlue,
        text: colours.lavenderBlue,
    },
};

export const navigationTheme: NavigationTheme = {
    ...BaseTheme,
    colors: {
        ...BaseTheme.colors,
        card: colours.lavenderBlue,
        border: colours.lavenderBlue,
    },
};

const paperTheme: PaperTheme = {
    ...DefaultTheme,
    ...BaseTheme,
    colors: {
        ...BaseTheme.colors,
        accent: colours.lavenderBlue,
        backdrop: colours.lavenderBlue,
        disabled: colours.lavenderBlue,
        error: colours.lavenderBlue,
        notification: colours.lavenderBlue,
        onBackground: colours.lavenderBlue,
        onSurface: colours.lavenderBlue,
        placeholder: colours.lavenderBlue,
        surface: colours.lavenderBlue,
    },
};

const AppTheme = {
    ...navigationTheme,
    ...paperTheme,
};

export default AppTheme;
