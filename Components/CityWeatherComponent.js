import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import RenderArrayMap from "./RenderArrayMap";
import RenderWeatherIcons from "./RenderWeatherIcons";

const CityWeatherComponent = ({loadedWeather, weather }) => {
  const {
    container,
    cityNameStyle,
    currentDateStyle,
    viewConditionsStyle,
  } = styles;

  if (!loadedWeather) {
    return (
      <View style={container}>
        <Text>Loading ...</Text>
      </View>
    );
  } else {
    const isDay = weather.current.is_day === "no" ? false : true;
    return (
      <View style={container}>
        <Text style={cityNameStyle}>{weather.location.name}</Text>
        <Text style={currentDateStyle}>{dateToDisplay()}</Text>
        <Text>Température : {weather.current.temperature}°C</Text>
        <View style={viewConditionsStyle}>
          <Text>Conditions météo actuelles : </Text>
          <RenderArrayMap contentArray={weather.current.weather_descriptions} />
        </View>
        <RenderWeatherIcons
          isDay={isDay}
          weatherIcons={weather.current.weather_icons}
        />
      </View>
    );
  }
};

const dateToDisplay = () => {
  const currentDate = new Date();
  const day =
    currentDate.getDay().toString.length === 1
      ? "0" + currentDate.getDay()
      : currentDate.getDay().toString();
  const month =
    currentDate.getMonth() < 9
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth().toString();
  const year = currentDate.getFullYear();
  return day + "/" + month + "/" + year;
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
