import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import HomeScreen from "./screens/HomeScreen";
import { appBackgroundColor } from "./utils/constants";
import LoaderAnimation from "./Components/LoaderAnimation";

const { Navigator, Screen } = createStackNavigator();

// ICI ON UTILISE UN STACK NAVIGATOR CAR PLUSIEURS SCREENS SONT PREVU PLUTARD POUR L'APPLICATION
// ILS ARRIVERONT PEUT ETRE JAMAIS MAIS DANS LE CAS OU J'AI LE TEMPS D'AGGRANDIR L'APP, JE PREVOIS.

const App = () => {
  const [loadedFont] = useFonts({
    MontserratBlack: require("./assets/fonts/montserrat/Montserrat-Black.ttf"),
    MontserratRegular: require("./assets/fonts/montserrat/Montserrat-Regular.ttf"),
    MontserratMedium: require("./assets/fonts/montserrat/Montserrat-Medium.ttf"),
    MontserratSemiBoldItalic: require("./assets/fonts/montserrat/Montserrat-SemiBoldItalic.ttf"),
  });

  if (!loadedFont) {
    return <LoaderAnimation />;
  } else {
    return (
      <NavigationContainer>
        <Navigator
          screenOptions={(options) => {
            return {
              cardStyle: { backgroundColor: appBackgroundColor },
              headerShown: false,
            };
          }}
        >
          <Screen name="Home" component={HomeScreen} />
        </Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
