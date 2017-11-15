import React, { Component } from 'react';
import { TextInput } from 'react-native';

export default class InputFeature extends Component {

  render () {
    return (
      <TextInput
          value={this.props.value}
          placeholder={this.props.placeholder}
          placeholderTextColor="#ecf0f1"
          keyboardType = 'numeric'
          onChangeText={this.props._handleTextChange}
          style={this.props.style}
      />
    )
  }
}