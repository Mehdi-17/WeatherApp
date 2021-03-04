import React from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomePageFooterComponent = () => {
  const catchPhrase = "Plus de détails sur la météo du jour";
  const { container, textStyle, touchableStyle } = styles;

  return (
    <View style={container}>
      <TouchableOpacity style={touchableStyle}>
        <Text style={textStyle}>{catchPhrase.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const halfCircleDimension = Dimensions.get("window").width / 2;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    width: "100%",
    height: halfCircleDimension,
    borderTopLeftRadius: halfCircleDimension,
    borderTopRightRadius: halfCircleDimension,
    position: "absolute",
    bottom: -75,
  },
  touchableStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    width: "75%",
    textAlign: "center",
    marginBottom: 50,
    fontFamily: "MontserratMedium",
  },
});

export default HomePageFooterComponent;
