import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // 0.17.0

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      prediction: "",
      message: "",
      showResult: false
    }

    //let host = "https://diabclass.herokuapp.com";
        fetch("https://diabclass.herokuapp.com/predict", {
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
        //let data = res.data
        this.setState({
          message: json_data.message,
          prediction: json_data.prediction,
          showResult: true
        })
      console.log(json_data)
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
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone!
          Save to get a shareable url.
        </Text>
        { toShow }
        <Card title="Local Modules">
          <AssetExample />
        </Card>
      </View>
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





 <InputFeature
            value={this.state.features.no_preg}
            onChangeText={this._handleTextChange}
            style={style}
          />
          
          <TextInput
            value={this.state.features.glucose_conc}
            onChangeText={this._handleTextChange}
            style={style}
          />
          
          <TextInput
            value={this.state.features.blood_pressure}
            onChangeText={this._handleTextChange}
            style={style}
          />
          
          <TextInput
            value={this.state.features.fold_thickness}
            onChangeText={this._handleTextChange}
            style={style}
          />
          
          <TextInput
            value={this.state.features.serum_insulin}
            onChangeText={this._handleTextChange}
            style={style}
          />
          
          <TextInput
            value={this.state.features.body_mass_index}
            onChangeText={this._handleTextChange}
            style={style}
          />
          
          <TextInput
            value={this.state.features.pedigree_func}
            onChangeText={this._handleTextChange}
            style={style}
          />