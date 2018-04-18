import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import MapResults from './MapResults';
import SearchBar from '../presentational/SearchBar';
import './App.less';


export default class App extends Component {
	constructor() {
		super()
		this.state = ({
			response: [],
			term: "",
			location: "",
		})
	}

	
	_handleRequest = (term, location) => {
		let corsProxy = 'http://localhost:3333';
		let url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=5`;

		axios({
		  method:'get',
		  url: `${corsProxy}/${url}`,
			headers: {
				'Cache-Control': 'no-cache',
				'Authorization': 'Bearer oliox1TtXNcFnfrIHS_i49kGfN6XwtyKo36Hku83UkRCoGpdmZ2Qc8YLTBXDVeSvJsBUYSMFLhgnLgSHnh4QOv6YIWHhIrcPMSeDgxeSjCKpuKnFbrfdLynE_cnLWnYx'
			},
		  responseType:'json'
		})

		.then( ( response ) => {
			this.setState({ response: response.data.businesses })
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

				<p>Let's begin here.</p>
				<SearchBar handleSearch={this._handleSearch} handleRequest={this._handleRequest} />

			 	<div className="alignment">
			 		<SearchResults response={ this.state.response } />
					<MapResults markers={this.state.response} />
			 	</div>

			</div>
		);
	}
}