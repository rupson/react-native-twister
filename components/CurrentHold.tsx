import React from 'react';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import { Hold } from '../types';

const CurrentHold: React.FC<{ hold: Hold }> = ({ hold }) => (
    <View style={{ paddingHorizontal: 20 }}>
        <View
            style={{
                height: 50,
                backgroundColor: `${hold.colour}`,
            }}
        />
        <Caption>{hold.name}</Caption>
    </View>
);

export default CurrentHold;
