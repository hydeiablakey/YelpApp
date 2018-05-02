import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import MapResults from '../presentational/MapResults';
import SearchBar from '../presentational/SearchBar';
import './App.less';


export default class App extends Component {
	constructor() {
		super()
		this.state = ({
			response: [],
			term: "",
			location: "",
			center: { 
				lat: 40.854131, 
				lng: -73.886601
			},
			defaultZoom: 9
		})
	}

	
	_handleRequest = (term, location) => {
		let corsProxy = 'http://localhost:3333';
		let url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=10`;

		axios({
		  method:'get',
		  url: `${corsProxy}/${url}`,
			headers: {
				'Cache-Control': 'no-cache',
				'Authorization': 'Bearer oliox1TtXNcFnfrIHS_i49kGfN6XwtyKo36Hku83UkRCoGpdmZ2Qc8YLTBXDVeSvJsBUYSMFLhgnLgSHnh4QOv6YIWHhIrcPMSeDgxeSjCKpuKnFbrfdLynE_cnLWnYx'
			},
		  responseType:'json'
		})


		//center corresponds to the center of the map from the API based on the search term. 
		.then( ( response ) => {
			let center = response.data.region.center;
			this.setState({ 
				response: response.data.businesses,
				center: {
					lat: center.latitude, 
					lng: center.longitude
				},
				defaultZoom: 11
			})

		    console.log( this.state.response );
		})

		.catch( ( error ) => {
			console.error( error );
		})

	}

	_handleSearch = (event) => {
		event.preventDefault();
		const termQuery = event.target.getElementsByTagName('input')[0].value;
		const locationQuery = event.target.getElementsByTagName('input')[1].value;
		console.log("Term: " + termQuery);
		console.log("Location: " + locationQuery);
		this._handleRequest(termQuery, locationQuery); 
		this.setState({
			term: termQuery, 
			location: locationQuery
		})
	}

	render() {
		return (
			<div className="App-container">
			<div className="triangle"></div>
			  <div className="logoBox"> 
				<p className="logo_title">Begin the search for items here.</p>
			  </div>
				<SearchBar handleSearch={this._handleSearch} handleRequest={this._handleRequest} />
			 	<div className="alignment">
			 		<SearchResults term={this.state.term} response={ this.state.response } />
					<MapResults  defaultzoom= {this.state.defaultZoom} center={ this.state.center } markers={this.state.response} />
			 	</div>

			</div>
		);
	}
}