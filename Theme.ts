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
        primary: colours.spaceCadet,
        text: colours.gunmetal,
    },
};

export const navigationTheme: NavigationTheme = {
    ...BaseTheme,
    colors: {
        ...BaseTheme.colors,
        card: colours.lavenderBlue,
        border: colours.gunmetal,
    },
};

const paperTheme: PaperTheme = {
    ...DefaultTheme,
    ...BaseTheme,
    colors: {
        ...BaseTheme.colors,
        accent: colours.platinum,
        backdrop: colours.frenchLilac,
        disabled: colours.lavenderBlue,
        error: colours.imperialRed,
        notification: colours.platinum,
        onBackground: colours.frenchLilac,
        onSurface: colours.frenchLilac,
        placeholder: colours.platinum,
        surface: colours.gunmetal,
    },
};

const AppTheme = {
    ...navigationTheme,
    ...paperTheme,
    colors: {
        ...navigationTheme.colors,
        ...paperTheme.colors,
        ...BaseTheme.colors,
    },
};

export default AppTheme;
