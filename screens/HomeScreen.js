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

  const [loadedAutoComplete, setLoadedAutoComplete] = useState(false);
  const [autoCompleteList, setAutoCompleteList] = useState([]);

  const baseUrlWeather = 'http://api.weatherstack.com/';
  const optionsUrl =
    'current?access_key=' +
    REACT_NATIVE_API_KEY_WEATHER +
    '&query=' +
    citySearchForWeather;

  const autoCompleteDisabled = true;
  // J AI DESACTIVE LAUTO COMPLETE AVEC CETTE VARIABLE = > autoCompleteDisabled
  //TODO : Finir l'auto complete de a search bar : https://medium.com/verclaire-nine/build-a-custom-autocomplete-search-bar-with-react-hooks-6e713ca2c5e0
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

  useEffect(() => {
    searchWeather();
  }, []);

  const searchBarAutoComplete = async (namePrefix) => {
    if (autoCompleteDisabled !== true) {
      setLoadedAutoComplete(false);
      const customHeaders = new Headers({
        'x-rapidapi-key': REACT_NATIVE_API_KEY_CITY,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      });

      if (namePrefix !== '') {
        const response = await fetch(
          'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=' +
            namePrefix +
            '&languageCode=FR',
          {
            method: 'GET',
            headers: customHeaders,
          }
        ).catch((error) => console.error(error));

        const jsonData = await response.json();
        setAutoCompleteList(jsonData.data);
        setLoadedAutoComplete(true);
      }
    }
  };

  const displayFlatListCity = () => {
    console.log('loaded autocomplete', loadedAutoComplete);
    if (loadedAutoComplete === true) {
      return (
        <FlatList
          data={autoCompleteList}
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
    }
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
          setCitySearchForWeather(value);
          searchBarAutoComplete(value);
        }}
        onSubmitEditing={() => searchWeather()}
        onClear={() => {
          setCitySearchForWeather('');
          setAutoCompleteList([]);
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
