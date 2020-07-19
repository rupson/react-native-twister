import { Button } from "react-native-paper";
import React from "react";
import { colours } from "../Theme";

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
    <Button
      icon={icon}
      onPress={onPress}
      style={{
        backgroundColor: colours.frenchLilac,
        flex: 1,
        alignItems: "center",
        width: "60%",
        height: 20,
      }}
      labelStyle={{ color: colours.platinum }}
      contentStyle={{ width: "60%", height: 20 }}
    >
      {text}
    </Button>
  );
};
