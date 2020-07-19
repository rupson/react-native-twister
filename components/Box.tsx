import React from "react";
import { View } from "react-native";
import { is } from "ramda";

export const Box: React.FC<{
  flex: number;
  flexDirection?: "row" | "column";
}> = ({ children, flex, flexDirection }) => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        padding: 5,
        height: "100%",
        flex,
        flexDirection: flexDirection || "column",
        width: flexDirection === "row" ? "50%" : "100%",
        alignContent: "center",
      }}
    >
      {children}
    </View>
  );
};
