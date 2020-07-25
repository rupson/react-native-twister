import React from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';

type BoxProps = Partial<ViewStyle>;

const commonStyles: Partial<ViewStyle> = {
    justifyContent: 'space-between',
    paddingTop: 25,
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
};

export const Box: React.FC<BoxProps> = ({ children, ...overrideStyles }) => {
    return (
        <View style={{ ...commonStyles, ...overrideStyles }}>{children}</View>
    );
};

export const BoxWithScrolling: React.FC<BoxProps> = ({
    children,
    ...overrideStyles
}) => {
    return (
        <ScrollView>
            <Box {...overrideStyles}>{children}</Box>
        </ScrollView>
    );
};
