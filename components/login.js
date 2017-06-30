import React, {Component} from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    AsyncStorage
} from "react-native";
import {StackNavigator} from "react-navigation";
//AsyncStorage.removeItem("token");
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 50,
    backgroundColor: "white",
  }
})

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: ""
        }
    }
    async _tokenChange(item, value) {
      await AsyncStorage.setItem(item, value);
      AsyncStorage.getItem("token", (err, result) => {
        console.log(result);
      });
    }
    static navigationOptions = {
      title: "WhyiMusic Login"
    };
    _handleLogin = () => {
      const {username, password} = this.state;
      let data = {
        username: username,
        password: password
      };
      fetch("http://192.168.1.195:8080/authenticate", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then((res) => {
        return res.json();
      }).then((json) => {
        if (json.token) {
          this._tokenChange("token", json.token);
          let {navigate} = this.props.navigation;
          navigate("Home");
        }
      });
    };
    render() {
        return(
          <View style={styles.container}>
            <Text>Username: </Text>
            <TextInput onChangeText={username => this.setState({username})}/>
            <Text>Password: </Text>
            <TextInput secureTextEntry={true} onChangeText={password => this.setState({password})}/>
            <Button title="Sign In" onPress={this._handleLogin}/>
          </View>
        )
    }
}