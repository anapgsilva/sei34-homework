import React, { Component } from 'react';
import axios from 'axios';
import FlightResults from './FlightResults';

class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            origin: '',
            destination: '',
            originList: {},
            destList: {},
            originCode: '',
            destCode: '',
            flightResults: {
                outbound: {},
                inbound: {}
            },
        }
        this._handleOriginInput = this._handleOriginInput.bind(this)
        this._handleDestinationInput = this._handleDestinationInput.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._chooseairport = this._chooseairport.bind(this)
    }

    _handleOriginInput( event ) {
        this.setState({
            origin: event.target.value,
            originList: {},
            originCode: '',
            flightResults: {
                outbound: {},
                inbound: {}
            },
        })
    }

    _handleDestinationInput( event ) {
        this.setState({
            destination: event.target.value,
            destList: {},
            destCode: '',
            flightResults: {
                outbound: {},
                inbound: {}
            },
        });
    }

    _handleSubmit(event) {
        event.preventDefault();
        // this is running the search for us
        if (this.state.destCode && this.state.originCode && this.state.destCode !== 'Airport Not Found' && this.state.originCode !== 'Airport Not Found') {
            axios({
                "method":"GET",
                "url": `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/AU/AUD/en-GB/${this.state.originCode}/${this.state.destCode}/2020-09-01`,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key":"07f0882601msh50570d8918a241ap1562e5jsn411449735371"
                },"params":{
                "inboundpartialdate":"2020-24-01"
                }
                })
                .then((response)=>{
                    let outbound = response;
                    axios({
                        "method":"GET",
                        "url":`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/AU/AUD/en-GB/${this.state.originCode}/${this.state.destCode}/2020-09-01`,
                        "headers":{
                        "content-type":"application/octet-stream",
                        "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                        "x-rapidapi-key":"07f0882601msh50570d8918a241ap1562e5jsn411449735371"
                        }
                        })
                        .then((response)=>{
                            this.setState({
                                flightResults: {
                                    inbound: response, 
                                    outbound: outbound,
                                }
                            })
                        })
                        .catch((error)=>{
                          console.log(error)
                        })
                })
                .catch((error)=>{
                    console.log(error);
            });

            

        } else {
            if (!this.state.destCode) this.cleanAirports('destination')
            if (!this.state.originCode) this.cleanAirports('origin')
        }
    }

    cleanAirports(leg) {
        // this line confirms airport code, probably need to do this first to get in SkyScanners format
        if (leg === 'origin') {
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
                    this.setState({
                        originList: response.data.Places,
                    })
                    if (this.state.originList.length === 1) {
                        this.setState({
                            originCode: this.state.originList[0].PlaceId,
                        })
                    }
                    if (this.state.originList.length === 0) {
                        this.setState({
                            originCode: 'Airport Not Found',
                        })
                    }
                })
                .catch((error)=>{
                    console.log(error)
            });
        } else if (leg === 'destination') {
            axios({
                "method":"GET",
                "url":"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/AU/AUD/en-GB/",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key":"07f0882601msh50570d8918a241ap1562e5jsn411449735371"
                },"params":{
                "query": this.state.destination
                }
                })
                .then((response)=>{
                    this.setState({
                        destList: response.data.Places,
                    })
                    if (this.state.destList.length === 1) {
                        this.setState({
                            destCode: this.state.destList[0].PlaceId,
                        })
                    }
                    if (this.state.destList.length === 0) {
                        this.setState({
                            destCode: 'Airport Not Found',
                        })
                    }
                })
                .catch((error)=>{
                    console.log(error)
            });  

        }              
    }

    _chooseairport(code, leg) {
        if (leg === 'origin') {
            this.setState({
                originList: {},
                originCode: code
            })
        } else if (leg === 'destination') {
            this.setState({
                destList: {},
                destCode: code
            })
        }
    }

    render() {
        return(
            <div>
                <form onSubmit={this._handleSubmit}>
                    <span>
                        <div>
                            <input type='search' placeholder='Origin' onInput={this._handleOriginInput} required />
                            {this.state.originCode ? <p>{this.state.originCode}</p> : false }
                        </div>
                    </span>
                    <span>
                        <div>
                            <input type='search' placeholder='Destination' onInput={this._handleDestinationInput}  />
                            {this.state.destCode ? <p>{this.state.destCode}</p> : false }
                        </div>
                    </span>
                    <input type='submit' value='Search'  />
                </form>
                
                {this.state.originList.length > 0 ? <AirportSelect airports={this.state.originList} leg="origin" onClick={(code) => this._chooseairport(code, 'origin')} /> : false}
                {this.state.destList.length > 0 ? <AirportSelect airports={this.state.destList} leg="destination" onClick={(code) => this._chooseairport(code, 'destination')} /> : false}
                
                <FlightResults value={this.state.flightResults}/>
                
            </div>
        )
    }
}

export default SearchForm;

function AirportSelect(props) {
    const airports = props.airports;
    let listItems = ''
    if (airports.length > 0) {
        listItems = airports.map((airport) => 
        <ListItems key={airport.PlaceId} onClick={() => props.onClick(airport.PlaceId, props.leg)} value={`${airport.PlaceName}, ${airport.CountryName}`} />
        )
    }

    return(
        <div>
            <h4>Did you mean?</h4>
            <ul>
                {listItems}
            </ul>
        </div>
    )
}

function ListItems (props) {
    return(
        <li onClick={() => props.onClick()}>{props.value}</li>
    );
}