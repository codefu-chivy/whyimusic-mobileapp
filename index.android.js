import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import { StackNavigator } from "react-navigation";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";

const whyimusic = StackNavigator({
  Home: {screen: Home},
  Register: {screen: Register},
  Login: {screen: Login}
});


AppRegistry.registerComponent('whyimusic', () => whyimusic);
