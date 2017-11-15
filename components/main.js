import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Constants } from 'expo';

// or any pure javascript modules available in npm
import InputFeature from "./components/InputFeature.js";

import { Card } from 'react-native-elements'; // 0.17.0

export default class App extends Component {
  constructor (props) {
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

  _handleTextChange = inputValue => {
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
              no_preg: this.state.features.no_preg,
              glucose_conc: this.state.features.glucose_conc,
              blood_pressure: this.state.features.blood_pressure,
              fold_thickness: this.state.features.fold_thickness,
              serum_insulin: this.state.features.serum_insulin,
              body_mass_index: this.state.features.body_mass_index,
              pedigree_func: this.state.features.pedigree_func
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
  };

  render() {
    
    const style = { width: 200, height: 44, padding: 8 }
    const keys = Object.keys(this.state.features)
    let featureList = keys.map((feature) => {
      let _feature = this.state.features[feature]
      return <InputFeature key={_feature.placeholder} placeholder={_feature.placeholder} value={_feature.value} onChangeText={this._handleTextChange} style={style} />
    })
    
    const toShow = this.state.showResult ? (
      <Card title={this.state.prediction + " - " + this.state.message}>
        <Button
          title="Back"
          onPress={this._handleResetButtonPress}
        />
      </Card>
    ) : (
      <Card title="Result">
          { this.state.message }
          { featureList }
          <Button
            title="Predict"
            onPress={this._handlePredictButtonPress}
          />
        </Card>
    )
    
    return (
      <ScrollView style={styles.container}>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
