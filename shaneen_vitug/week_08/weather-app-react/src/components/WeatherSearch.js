import React, { Component } from 'react';
import axios from 'axios';

class WeatherSearch extends Component {
  state = {
    city: '',
    weatherInfo: null,
    error: false
  }

  fetchInfo = (city) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather';
    const weatherParams = {
      q: city,
      units: 'metric',
      appid: 'dc0ba9ecf138c1e8167017659deef39b' 
    };
    axios.get(url, {params: weatherParams}).then((result) => {
      // console.log(result.data); });
   
      this.setState({weatherInfo: result.data, error: false});
    }).catch((error) => {
      this.setState({ error: true })
    })
    //   this.setState({weatherInfo: null})
    // });
  }

  render() {
    const { weatherInfo, error } = this.state
    return(
      <div>
        <h2>Weather App</h2>
        <SearchForm onSubmit={this.fetchInfo} />
        {weatherInfo && <WeatherInfo data={weatherInfo}/>}
        {error && <h3>Something went wrong. <span onClick={() => {this.setState({ error: false })}}>X</span></h3>}
      </div>
    );
  }
}

class SearchForm extends Component {
  state = { query: '' };

  _handleInput = (e) => {
    this.setState( {query: e.target.value} )
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  }

  render() {
    return(
      <form onSubmit={ this._handleSubmit }>
        <input type="search" placeholder="Enter City Name" required onInput={ this._handleInput } />
        <input type="submit" value="Search" />
      </form>
    );
  }
}

const WeatherInfo = (props) => (
  <div>
    <img src={`http://openweathermap.org/img/w/${ props.data.weather[0].icon }.png` } alt={props.data.weather[0].description} />
    <h4>{props.data.weather[0].main}: {props.data.weather[0].description}</h4>
    <h3>{~~(props.data.main.temp)}&deg;C</h3>
  </div>
)


export default WeatherSearch