import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { prefix } from "../utils/constants";

const RenderWeatherIcons = ({ weatherIcons, isDay }) => {
  const { container, imgStyle } = styles;
  const renderDayIcon = isDay ? (
    <Ionicons name={`${prefix}-sunny`} size={28} color="black" />
  ) : (
    <Ionicons name={`${prefix}-moon`} size={28} color="black" />
  );

  return (
    <View style={container}>
      {weatherIcons.map((icon, index) => {
        return <Image key={index} style={imgStyle} source={{ uri: icon }} />;
      })}
      {renderDayIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 5,
  },
});

export default RenderWeatherIcons;
