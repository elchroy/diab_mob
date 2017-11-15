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
  Button,
  ScrollView
} from 'react-native';
import InputFeature from "./components/InputFeature.js";

import { Card } from 'react-native-elements'; // 0.17.0

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const numbers = '0123456789';

export default class App extends Component<{}> {


  constructor(props) {
    super(props);
    this.state = {
      prediction: "",
      message: "",
      showResult: false,
      features: {
        no_preg: {
          placeholder: "Number of Pregnancies",
          value:""
        },
        glucose_conc: {
          placeholder: "Glucose Concentration",
          value:""
        },
        blood_pressure: {
          placeholder: "Blood Pressure",
          value:""
        },
        fold_thickness: {
          placeholder: "Fold Thickness",
          value:""
        },
        serum_insulin: {
          placeholder: "Serum Insulin",
          value:""
        },
        body_mass_index: {
          placeholder: "Body Mass Index",
          value:""
        },
        pedigree_func: {
          placeholder: "Pedigree Function",
          value:""
        }
      }
    }
  }

  _handleTextChange = (inputValue) => {
    this.setState({ inputValue });
  };
  
  _handleResetButtonPress = () => {
    this.setState({
      message: "",
      prediction: "",
      showResult: false
    })
  }

  _handlePredictButtonPress = () => {
    let host = "https://diabclass.herokuapp.com"
      fetch(`${host}/predict`, {method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
              no_preg: this.state.features.no_preg.value,
              glucose_conc: this.state.features.glucose_conc.value,
              blood_pressure: this.state.features.blood_pressure.value,
              fold_thickness: this.state.features.fold_thickness.value,
              serum_insulin: this.state.features.serum_insulin.value,
              body_mass_index: this.state.features.body_mass_index.value,
              pedigree_func: this.state.features.pedigree_func.value
        })
      })
        .then((res) => {
        return res.json()
      }).then((json_data) => {
        this.setState({
          message: json_data.message,
          prediction: json_data.prediction,
          showResult: true
        })
      }).catch(() => {
        this.setState({
          message: "Please check your network.",
          prediction: "",
          showResult: true
        })
      })
  }

  render () {
    const style = { width: 200, height: 44, padding: 8 }
    const keys = Object.keys(this.state.features)
    let featureList = keys.map((feature) => {
      let _feature = this.state.features[feature]
      return <InputFeature key={_feature.placeholder} placeholder={_feature.placeholder} value={_feature.value} _handleTextChange={(inputValue) => {

        let newText = '';
        let len = inputValue.length

        for (var i = 0; i < len; i++) {
          if ( numbers.indexOf(inputValue[i]) > -1 ) {
            newText = newText + inputValue[i];
          }
        }   

        let newState = this.state
        newState.features[feature].value = inputValue
        this.setState(newState)
      }} style={style} />
    })
    
    const toShow = this.state.showResult ? (
      <Card title={this.state.prediction + " - " + this.state.message}>
        <Button
          title="Back"
          onPress={this._handleResetButtonPress}
        />
      </Card>
    ) : (
      <Card title={ this.state.message }>
          { featureList }
          <Button
            title="Predict"
            onPress={this._handlePredictButtonPress}
          />
      </Card>
    )

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.paragraph}>
          Diabetic or Not?
        </Text>
        { toShow }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 10
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
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
