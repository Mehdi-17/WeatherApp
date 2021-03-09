import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import WeatherIllustration from '../assets/weatherIllustration.png';
import CityWeatherComponent from '../Components/CityWeatherComponent';
import HomePageFooterComponent from '../Components/HomePageFooterComponent';
import { statusBarHeight } from '../utils/constants';
import { appBackgroundColor } from '../utils/constants';
import { REACT_NATIVE_API_KEY_WEATHER, REACT_NATIVE_API_KEY_CITY } from '@env';
import { FlatList } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const {
    container,
    imgStyle,
    searchBarBackground,
    flatListStyle,
    flatListHidden,
  } = styles;

  const [citySearchForWeather, setCitySearchForWeather] = useState('Tours');

  const [loadedWeather, setLoadedWeather] = useState(false);
  const [weather, setWeather] = useState();

  const [loadedJsonFile, setLoadedJsonFile] = useState(false);
  //le tableau mis à jour en fonction de la search bar
  const [autoCompleteList, setAutoCompleteList] = useState([]);

  // le tableau de base qui ne bouge pas
  let cities;

  const baseUrlWeather = 'http://api.weatherstack.com/';
  const optionsUrl =
    'current?access_key=' +
    REACT_NATIVE_API_KEY_WEATHER +
    '&query=' +
    citySearchForWeather;

  const autoCompleteDisabled = true;
  //TODO : TROUVER UN MOYEN POUR A SEARCH BAR AUTOCOMPLETE? CAR LE FICHIER JSON EST BCP TROP LOURD VOIR POUR AVOIR UN JSON QUE DES VILLES DE FRANCE ...
  //... ET LES PRINCIPALES VILES DU MONDE
  // https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.country&location=2,0.91008,0.12126&basemap=jawg.streets
  //TODO : Finir l'auto complete de la search bar : https://medium.com/verclaire-nine/build-a-custom-autocomplete-search-bar-with-react-hooks-6e713ca2c5e0
  //TODO : trouver une autre api de ville, avec l'info nom ville, pays, population ville. Si je trouve pas, faire ma propre api et database
  //TODO : Rendre le truc + design
  //TODO : Checker si tous les imports sont ok

  const searchWeather = async () => {
    setLoadedWeather(false);
    await fetch(baseUrlWeather + optionsUrl)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error(error))
      .finally(() => setLoadedWeather(true));
  };

  const loadAllCities = async () => {
    setLoadedJsonFile(false);
    console.log('chargement...')
    cities = require('../assets/json/cities.json');
    console.log('Cities :', cities);
    setLoadedJsonFile(true);
  };

  useEffect(() => {
    searchWeather();
    loadAllCities();
  }, []);

  const updateAutoComplete = (namePrefix) => {
    setCitySearchForWeather(namePrefix);

    let search = query.toLowerCase();
    if (hero.name.startsWith(search, 14)) {
      return formatNames(hero);
    } else {
      heroes.splice(heroes.indexOf(hero), 1);
      return null;
    }
  };

  const displayFlatListCity = () => {
    return (
      <FlatList
        data={cities}
        keyExtractor={(i) => i.id.toString()}
        extraData={autoCompleteList}
        style={flatListStyle}
        renderItem={({ item }) => (
          <Text onPress={() => setCitySearchForWeather(item.name)}>
            {item.name}, {item.country}
          </Text>
        )}
      />
    );
  };

  return (
    <View style={container}>
      <SearchBar
        inputStyle={searchBarBackground}
        containerStyle={searchBarBackground}
        inputContainerStyle={searchBarBackground}
        searchIcon={{ size: 24 }}
        placeholder="Entrer la ville ici..."
        onChangeText={(value) => {
          updateAutoComplete(value);
        }}
        onSubmitEditing={() => searchWeather()}
        onClear={() => {
          setCitySearchForWeather('');
        }}
        value={citySearchForWeather}
      />

      {displayFlatListCity()}

      <Image style={imgStyle} source={WeatherIllustration} />

      <CityWeatherComponent loadedWeather={loadedWeather} weather={weather} />
      <HomePageFooterComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: statusBarHeight,
  },
  searchBarBackground: {
    backgroundColor: appBackgroundColor,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    width: '100%',
  },
  imgStyle: {
    marginTop: 50,
    marginBottom: 50,
  },
  flatListStyle: {
    marginTop: 15,
    fontSize: 20,
    borderBottomColor: '#26a69a',
    borderBottomWidth: 1,
  },
});

export default HomeScreen;
