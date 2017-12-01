import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
        <Text>Enter Your name </Text>
        <TextInput
          placeholder="name"
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          underlineColorAndroid="transparent"
          style={{
            height: 40,
            padding: 10,
            borderWidth: 2,
            borderColor: "black",
            marginTop: 20,
            marginBottom: 20
          }}
        />
        <TouchableOpacity
          onPress={() => Actions.chat({ username: this.state.name })}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
