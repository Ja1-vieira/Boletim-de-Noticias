import React, { Component } from 'react';
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import axios from 'axios';

export default class WeatherScreen extends Component {
  constructor() {
    super();
    this.state = {
      weather: '',
    };
  }

  getWeather = async () => {
    //mudar latitude e longitude
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139';
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          weather: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.getWeather();
  };

  render() {
    if (this.state.weather === '') {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Tempo : {this.state.weather.weather[0].description}</Text>
          <Text>Velocidade dos ventos : {this.state.weather.wind.speed}</Text>
          <Text>Temperatura : {this.state.weather.main.temp}</Text>
          <Text>Temperatura mínima : {this.state.weather.main.temp_min}</Text>
          <Text>Temperatura máxima : {this.state.weather.main.temp_max}</Text>
          <Text>Pressão : {this.state.weather.main.pressure}</Text>
          <Text>Umidade : {this.state.weather.main.humidity}</Text>
          <TouchableOpacity
              style={styles.buttons}
              onPress={() => this.props.navigation.navigate('HomeScreen')}>
              <Text style={{ fontSize:20, color:"black"}}>Voltar</Text>
        </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
    buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
    width: 160,
    height: 50,
  }
});