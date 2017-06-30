import React, {Component} from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableHighlight,
    StyleSheet
} from "react-native";
import {StackNavigator} from "react-navigation";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 50,
    backgroundColor: "white",
  },
  message: {
    color: "red",
    fontStyle: "italic"
  }
});

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          fullName: "",
          email: "",
          password: "",
          changeUserName: false
        }
    };
    static navigationOptions = {
      title: "Register for WhyiMusic"
    };
    _handleSubmit = () => {
      const {username, fullName, email, password} = this.state;
      let data = {
        username: username,
        fullName: fullName,
        email: email,
        password: password
      };
      this.setState({
        changeUserName: false
      });
      fetch("http://192.168.1.195:8080/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then((res) => {
        return res.json();
      }).then((json) => {
        const {navigate} = this.props.navigation;
        if (!json.message) {
          this.setState({
            changeUserName: true
          });
        }
        else {
          console.log("logging")
          navigate("Login");
        }
      }).catch((err) => {
        if (err) {
          throw err;
        }
      });
    };
    render() {
      const message = this.state.changeUserName ? (
        <View>
          <Text style={styles.message}>Username already exists</Text>
        </View>
        ) : null;
        return (
            <View style={styles.container}>
              <Text>Full Name: </Text>
              <TextInput placeholder="Enter your full name" onChangeText={fullName => this.setState({fullName})}/>
              <Text>Email: </Text>
              <TextInput placeholder="Enter email address" onChangeText={email => this.setState({email})}/>
              <Text>Username</Text>
              <TextInput placeholder="Choose a username" onChangeText={username => this.setState({username})}/>
              <Text>Password: </Text>
              <TextInput secureTextEntry={true} placeholder="Must be at least 6 characters" onChangeText={password => {this.setState({password})}}/>
              {message}
              <Button title="Register" color="green" onPress={this._handleSubmit}/>
            </View>
        )
    }
}