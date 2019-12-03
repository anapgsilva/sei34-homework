import React, { Component } from 'react';
import axios from 'axios';


class WeatherSearch extends Component {
  constructor() {
    super();
    this.state = {
      weather: null
    };
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  fetchWeather(q) {
    // console.log( q );

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=fb5959ac8877b7ea446b2db3de30426c`

    axios.get(url)
      .then(response => {
        this.setState({
          weather: response.data
        })
      })
  }



  render() {
    return (
      <div>
        <SearchForm onSubmit={ this.fetchWeather }/>
        <Result weather={ this.state.weather }/>
      </div>
    )
  }
}

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleInput = this._handleInput.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  }

  _handleInput(event) {
    this.setState({ query: event.target.value })
  }

  render() {
    return(
      <div>
        <form onSubmit={ this._handleSubmit }>
          <input type="search" placeholder="London" required onInput={ this._handleInput }/>
          <input type="submit" name="search" />
        </form>
      </div>
    )
  }
}

const Result = (props) => {

  console.log( props.weather );

  if (props.weather === null) {

    return "";

  } else {

    return (
      <div>
        <h1>{props.weather.name}</h1>
        <p>{props.weather.weather[0].main}</p>
      </div>
    )
  }
}

export default WeatherSearch;
