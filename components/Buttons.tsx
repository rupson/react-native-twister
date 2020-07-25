import { Button, IconButton } from 'react-native-paper';
import React from 'react';
import AppTheme from '../Theme';
import { View } from 'react-native';

interface PrimaryButtonProps {
    text: string;
    icon?: string;
    onPress: () => void;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    text,
    icon,
    onPress,
}) => {
    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            <Button
                icon={icon}
                onPress={onPress}
                style={{
                    backgroundColor: AppTheme.colors.surface,
                    width: 150,
                }}
                labelStyle={{ color: AppTheme.colors.accent }}
            >
                {text}
            </Button>
        </View>
    );
};
interface ButtonWithIconProps {
    onPress: () => void;
    text: string;
    icon?: string;
}
export const SecondaryButton: React.FC<ButtonWithIconProps> = ({
    icon,
    text,
    onPress,
}) => {
    return (
        <View style={{ alignItems: 'flex-start' }}>
            <Button icon={icon} color={AppTheme.colors.text} onPress={onPress}>
                {text}
            </Button>
        </View>
    );
};

interface LargeIconButtonProps {
    onPress: () => void;
    icon: string;
}
export const LargeIconButton: React.FC<LargeIconButtonProps> = ({
    onPress,
    icon,
}) => {
    return (
        <IconButton
            onPress={onPress}
            icon={icon}
            size={100}
            style={{
                borderWidth: 0,
                height: '100%',
            }}
        />
    );
};
