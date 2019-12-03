import React, { Component } from 'react';

class FlightResults extends Component {

    render() {
        const results = this.props.value;
        if (this.props.value.outbound.data) {
            const inboundCarriers = results.inbound.data.Carriers; // contains an array with object, below
            const inboundQuotes = results.inbound.data.Quotes; // contains an array of objects, below 
            const inboundPlaces = results.inbound.data.Places; // contains an array of objects, below
            const outboundCarriers = results.outbound.data.Carriers; // contains an array with object, below
            const outboundQuotes = results.outbound.data.Quotes; // contains an array of objects, below 
            const outboundPlaces = results.outbound.data.Places; // contains an array of objects, below
        }

        console.log(this.props.value)
        return(
            <p>Results coming</p>
        )
    }

}

export default FlightResults





// Places: Array(2)
    // 0:
        // CityId: "BUEA"
        // CityName: "Buenos Aires"
        // CountryName: "Argentina"
        // IataCode: "EZE"
        // Name: "Buenos Aires Ministro Pistarini"
        // PlaceId: 50421
        // SkyscannerCode: "EZE"
        // Type: "Station"

// Carriers: Array(2)
    // 0:
        // CarrierId: 1361
        // Name: "LATAM Airlines Group"

// Quotes: Array(6)
    // 0:
    // Direct: false
    // MinPrice: 859
    // OutboundLeg:
    // CarrierIds: Array(1)
        // 0: 1482
        // length: 1
    // DepartureDate: "2020-09-01T00:00:00"
    // DestinationId: 50421
    // OriginId: 82628
    // QuoteDateTime: "2019-11-18T08:15:00"
    // QuoteId: 1