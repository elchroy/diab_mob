/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      prediction: "",
      message: "",
      showResult: false,
    }
    let host = "https://diabclass.herokuapp.com"
    fetch(`${host}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          no_preg: "0.213",
              glucose_conc: "0.554",
              blood_pressure: "0.207",
              fold_thickness: "0.0",
              serum_insulin: "0.0",
              body_mass_index: "0.749",
              pedigree_func: "0.22"
        })
      }).then((res) => {
        return res.json()
      }).then((json_data) => {
        this.setState({
          message: json_data.message,
          prediction: json_data.prediction,
          showResult: true
        })
      })
  }
  render() {
    const toShow = this.state.showResult ? (
      <Text style={styles.instructions}>
        {this.state.prediction} - {this.state.message}
      </Text>
    ) : (
      <Text style={styles.instructions}>
        Fill the form to determine the result
      </Text>
    )
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        { toShow }
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
