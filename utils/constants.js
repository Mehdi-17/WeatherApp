import Constants from 'expo-constants';
import {Platform} from "react-native";

export const statusBarHeight = Constants.statusBarHeight;
export const prefix = Platform.OS === "ios" ? "ios" : "md";
export const appBackgroundColor = "#F5FDC6";