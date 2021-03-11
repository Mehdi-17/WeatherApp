import React from "react";
import { View, StyleSheet } from "react-native";
import BouncingPreloader from "react-native-bouncing-preloaders";

const LoaderAnimation = () => {
  const { container } = styles;

  return (
    <View style={container}>
      <BouncingPreloader
        icons={[
          "https://www.shareicon.net/data/256x256/2016/05/04/759946_bar_512x512.png"
        ]}
        leftRotation="-680deg"
        rightRotation="360deg"
        leftDistance={-80}
        rightDistance={-250}
        speed={800}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoaderAnimation;
