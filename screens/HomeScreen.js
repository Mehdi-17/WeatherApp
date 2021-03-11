import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import WeatherIllustration from '../assets/weatherIllustration.png';
import CityWeatherComponent from '../Components/CityWeatherComponent';
import HomePageFooterComponent from '../Components/HomePageFooterComponent';
import { statusBarHeight, prefix } from '../utils/constants';
import { Ionicons } from '@expo/vector-icons';
import {
  REACT_NATIVE_API_KEY_WEATHER,
  REACT_NATIVE_API_KEY_GOOGLE_PLACES,
} from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// TODO: dans l'appel à l'api, rajouter un paramètre optionnel pays pour pas qu'on ai de résultats random
// Ex : si je cherche Venise et que je clique sur "Venise, Italie" dans l'auto complete google ...
// ... ca va me renvoyer le Venise en France qui est en Franche-Comte

const HomeScreen = () => {
  const baseCity = 'Tours';
  const { container, imgStyle, contentContainer, searchBarContainer } = styles;
  const [city, setCity] = useState('');

  const [loadedWeather, setLoadedWeather] = useState(false);
  const [weather, setWeather] = useState();

  const baseUrlWeather = 'http://api.weatherstack.com/';
  const optionsUrl =
    'current?access_key=' + REACT_NATIVE_API_KEY_WEATHER + '&query=';

  useEffect(() => {
    city !== '' ? searchWeather(city) : searchWeather(baseCity);
  }, []);

  const searchWeather = async (value) => {
    setLoadedWeather(false);
    await fetch(baseUrlWeather + optionsUrl + value)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error(error))
      .finally(() => setLoadedWeather(true));
  };

  return (
    <View style={container}>
      <View style={searchBarContainer}>
        <GooglePlacesAutocomplete
          ref={(instance) => (this.googlePlacesRef = instance)}
          placeholder="Entrer la ville ici..."
          onPress={(data) => {
            searchWeather(data.structured_formatting.main_text.toString());
            setCity(data.structured_formatting.main_text.toString());
          }}
          query={{
            key: REACT_NATIVE_API_KEY_GOOGLE_PLACES,
            language: 'fr',
            types: '(cities)',
          }}
          styles={autoCompleteStyles}
          enablePoweredByContainer={false}
          textInputProps={{ clearButtonMode: 'while-editing' }}
          renderRightButton={() => (
            <TouchableOpacity
              onPress={() => {
                this.googlePlacesRef.setAddressText('');
              }}
            >
              <Ionicons name={`${prefix}-close-sharp`} size={44} />
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={contentContainer}>
        <Image style={imgStyle} source={WeatherIllustration} />

        <CityWeatherComponent loadedWeather={loadedWeather} weather={weather} />
      </View>
      <HomePageFooterComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: statusBarHeight,
    width: '100%',
  },
  searchBarContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    top: statusBarHeight,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    marginTop: 50,
    marginBottom: 50,
  },
});

const autoCompleteStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  },
  listView: {
    borderColor: '#c8c7cc',
    borderWidth: 1,
    borderRadius: 2,
  },
  textInput: {
    height: 44,
  },
});
export default HomeScreen;
