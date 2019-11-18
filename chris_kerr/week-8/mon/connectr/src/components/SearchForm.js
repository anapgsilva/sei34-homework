import React, { Component } from 'react';
import axios from 'axios';


class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            origin: '',
            destination: '',
        }
        this._handleOriginInput = this._handleOriginInput.bind(this)
        this._handleDestinationInput = this._handleDestinationInput.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
    }

    _handleOriginInput( event ) {
        this.setState({
            origin: event.target.value
        })
    }

    _handleDestinationInput( event ) {
        this.setState({
            destination: event.target.value
        });
    }

    _handleSubmit( event ) {
        event.preventDefault();

        // this is running the search for us
        axios({
            "method":"GET",
            "url":"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/AU/AUD/en-GB/SYD-sky/LOND-sky/2020-09-01",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key":"07f0882601msh50570d8918a241ap1562e5jsn411449735371"
            },"params":{
            "inboundpartialdate":"2020-12-01"
            }
            })
            .then((response)=>{
              console.log(response)
            })
            .catch((error)=>{
              console.log(error)
            })

            // this line confirms airport code, probably need to do this first to get in SkyScanners format
            axios({
                "method":"GET",
                "url":"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/AU/AUD/en-GB/",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key":"07f0882601msh50570d8918a241ap1562e5jsn411449735371"
                },"params":{
                "query": this.state.origin
                }
                })
                .then((response)=>{
                  console.log(response)
                })
                .catch((error)=>{
                  console.log(error)
                })
        
    }

    render() {
        return(
            <form onSubmit={this._handleSubmit}>
                <input type='search' placeholder='Origin' onInput={this._handleOriginInput} required />
                <input type='search' placeholder='Destination' onInput={this._handleDestinationInput} required />
                <input type='submit' value='Search'  />

            </form>
        )
    }

}

export default SearchForm