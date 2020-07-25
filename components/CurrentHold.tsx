import React from 'react';
import { View } from 'react-native';

const CurrentHold: React.FC<{ colour: string }> = ({ colour }) => (
    <View style={{ paddingHorizontal: 20 }}>
        <View
            style={{
                height: 50,
                backgroundColor: `${colour}`,
            }}
        />
    </View>
);

export default CurrentHold;
