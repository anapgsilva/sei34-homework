import React, {Component} from 'react';
import axios from 'axios';



class Weather extends Component {
  constructor() {
    super();
    this.state = { weatherInfo: null};
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  fetchWeather(q){
    //request to API
    console.log('Searching for weather in ', q);

    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=10e736b75728b3f6b48e6c10a6afd7e1`;

    console.log(weatherURL);
    //weather request
    axios.get(weatherURL).then((results) => {
      this.setState({weatherInfo: results.data});
      console.log(results.data);
    });
  }

  render(){
    return(
      <div>
        <h1>Weather search</h1>
        <Search onSubmit={this.fetchWeather} />
        <Result data={this.state.weatherInfo} />
      </div>
    )
  }
}


class Search extends Component {
  constructor(){
    super();
    this.state = {query: ''};
    this._handleInput = this._handleInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleInput(event){
    this.setState({query: event.target.value});
  };

  _handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  }

  render(){
    return(
      <form onSubmit={this._handleSubmit}>
        <input type="search" placeholder="City" required onInput={this._handleInput} />
        <input type="submit" value="search" />
      </form>
    )
  };


}

const Result = (props) => {
  if (props.data === null) {
    return "";
  }
  else {
    const city = props.data.name;
    const description = props.data.weather[0].main;
    const temp = props.data.main.temp - 273;
    const icon = props.data.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
      <div className="weatherResult" >
        <h2 className="city" >{city}</h2>
        <img src={iconURL} alt={iconURL} />
        <h3>{description}</h3>
        <h3>{Math.round(temp)} &#8451;</h3>
      </div>
    )
  };
};


export default Weather;
