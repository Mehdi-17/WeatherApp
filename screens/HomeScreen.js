import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import WeatherIllustration from "../assets/weatherIllustration.png";
import CityWeatherComponent from "../Components/CityWeatherComponent";
import HomePageFooterComponent from "../Components/HomePageFooterComponent";
import { statusBarHeight } from "../utils/constants";
import { appBackgroundColor } from "../utils/constants";
import { REACT_NATIVE_API_KEY } from "@env";

const HomeScreen = () => {
  const { container, imgStyle, searchBarBackground } = styles;

  const [citySearch, setCitySearch]       = useState("Tours");
  const [loadedWeather, setLoadedWeather] = useState(false);
  const [weather, setWeather]             = useState();

  const baseUrl    = "http://api.weatherstack.com/";
  const apiKey     = REACT_NATIVE_API_KEY;
  const optionsUrl = "current?access_key=" + apiKey + "&query=" + citySearch;

  //TODO : Créer un component d'animation de loading

  const searchWeather = () => {
    setLoadedWeather(false);
    fetch(baseUrl + optionsUrl)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error(error))
      .finally(() => setLoadedWeather(true));
  };

  useEffect(() => {
    searchWeather();
  }, []);

  return (
    <View style={container}>
      <SearchBar
        inputStyle={searchBarBackground}
        containerStyle={searchBarBackground}
        inputContainerStyle={searchBarBackground}
        searchIcon={{ size: 24 }}
        placeholder="Entrer la ville ici..."
        onChangeText={(value) => setCitySearch(value)}
        onSubmitEditing={() => searchWeather()}
        onClear={() => setCitySearch("")}
        value={citySearch}
      />

      <Image style={imgStyle} source={WeatherIllustration} />

      <CityWeatherComponent loadedWeather={loadedWeather} weather={weather} />
      <HomePageFooterComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: statusBarHeight,
  },
  searchBarBackground: {
    backgroundColor: appBackgroundColor,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    width: "100%",
  },
  imgStyle: {
    marginTop: 50,
    marginBottom: 50,
  },
});

export default HomeScreen;
