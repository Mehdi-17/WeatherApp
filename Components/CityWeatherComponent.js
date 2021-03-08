import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LoaderAnimation from "./LoaderAnimation";
import RenderArrayMap from "./RenderArrayMap";
import RenderWeatherIcons from "./RenderWeatherIcons";

const CityWeatherComponent = ({ loadedWeather, weather }) => {
  const {
    container,
    cityNameStyle,
    currentDateStyle,
    viewConditionsStyle,
  } = styles;

  //TODO: régler le bug du weather.location.name

  if (!loadedWeather) {
    return (
        <LoaderAnimation />
    );
  } else {
    return (
      <View style={container}>
        <Text style={cityNameStyle}>{weather.location.name}, {weather.location.region != "" ? weather.location.region + ", " : ""}{weather.location.country}</Text>
        <Text style={currentDateStyle}>Heure locale : {weather.location.localtime}</Text>
        <Text>Température : {weather.current.temperature}°C</Text>
        <View style={viewConditionsStyle}>
          <Text>Conditions météo actuelles : </Text>
          <RenderArrayMap contentArray={weather.current.weather_descriptions} />
        </View>
        <RenderWeatherIcons
          isDay={weather.current.is_day === "no" ? false : true}
          weatherIcons={weather.current.weather_icons}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cityNameStyle: {
    fontFamily: "MontserratBlack",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center"
  },
  currentDateStyle: {
    fontFamily: "MontserratSemiBoldItalic",
    opacity: 0.6,
    fontSize: 14,
  },
  viewConditionsStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
});

export default CityWeatherComponent;
