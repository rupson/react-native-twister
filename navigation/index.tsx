import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { navigationTheme } from '../Theme';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabOneScreen from '../screens/TabOneScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName;
}) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : navigationTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName='Setup'>
            <Stack.Screen
                name='Setup'
                component={TabTwoScreen}
                options={{ headerTitle: 'setup' }}
            />
            <Stack.Screen
                name='Play'
                component={TabOneScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
