import React from 'react';
import { View, ViewStyle } from 'react-native';

type BoxProps = Partial<ViewStyle>;

export const Box: React.FC<BoxProps> = ({ children, ...overrideStyles }) => {
    return (
        <View
            style={{
                justifyContent: 'space-between',
                paddingTop: 25,
                height: '100%',
                flex: 1,
                flexDirection: 'column',
                alignContent: 'center',
                ...overrideStyles,
            }}
        >
            {children}
        </View>
    );
};
