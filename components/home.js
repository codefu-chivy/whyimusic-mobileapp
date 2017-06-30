import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  AsyncStorage
} from 'react-native';
import {sampleData} from "./artists";
import {StackNavigator} from "react-navigation";
import jwt_decode from "jwt-decode";
export default class whyimusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    }
  };
  static navigationOptions = {
    title: "Welcome"
  }  
  _onPress = () => {
    if (this.state.token) {
      AsyncStorage.removeItem("token", (err) => {
        if (err) {
          throw err;
        }
      }).then(() => {
        this.setState({
          token: ""
        });
      });
      
    }
    else {
      const {navigate} = this.props.navigation;
      navigate("Login");
    }
  }
  render() {
    const buttonText = this.state.token ? "Logout" : "Sign In"
    AsyncStorage.getItem("token", (err, result) => {
      if (result) {
        this.setState({
          token: jwt_decode(result)._doc
        });
      }  
    });
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WhyiMusic</Text>
        <Text>{this.state.token ? "Hello, " + this.state.token.name : null}</Text>
        <View style={styles.buttonContainer}>
          {this.state.token ? null : <Button onPress={() => navigate("Register")} style={styles.button} title="Sign Up"/>}
          <Button onPress={this._onPress} style={styles.button} title={buttonText}/>
        </View>
        {sampleData.map((ele, id) => {
          return ( 
          <View style={styles.views} key={id + ele.name}>
            <Image style={styles.image} source={{uri: ele.photo.url}}/>
            <Text style={styles.text}>{ele.name}</Text>
            <Text style={styles.description}>{ele.description}</Text>
            <View style={styles.tagsContainer}><Text>Tags: </Text>{ele.tags.map((ele, id) => {
              return (
                <View style={styles.tagsStyle} key={id}>
                  <Text>{ele} </Text>
                </View>
              )
            })}</View>
          </View> )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gainsboro",
    alignItems: "center"
  },
  views: {
    margin: 10,
    width: 270,
    height: 270,
    backgroundColor: "white"
},
  text: {
    padding: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  title: {
    fontSize: 35,
    fontStyle: "italic"
  },
  image: {
    width: 270,
    height: 150
  },
  description: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 180
  },
  button: {
    width: 100
  },
  tagsContainer: {
    width: 200,
    flexDirection: "row"
  },
  tagsStyle: {
    backgroundColor: "lightgrey",
    margin: 5,
    padding: 3,
    borderRadius: 10
  }
});