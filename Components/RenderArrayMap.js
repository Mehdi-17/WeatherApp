import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RenderArrayMap = ({ contentArray }) => {
  const { container } = styles;
  const arrayLength = contentArray.length;

  //Ici on préfère utiliser une map qu'une flat list car on sait que le tableau passé n'aura pas une infinité d'éléments
  return (
    <View style={container}>
      {contentArray.map((element, index) => {
        return arrayLength === index + 1 ? (
          <Text key={index}>{element}.</Text>
        ) : (
          <Text key={index}>{element}, </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RenderArrayMap;
