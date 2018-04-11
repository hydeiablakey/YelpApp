import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import MapResults from './MapResults';
import SearchBar from '../presentational/SearchBar';
import './App.less';


export default class App extends Component {
	constructor() {
		super()
		this.state = ({response: []})
	}

	
	_handleRequest = (event) => {
		event.preventDefault();
		let corsProxy = 'http://localhost:3333';
		let url = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=10473';

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

	render() {
		return (
			<div className="App-container">

				<p>Let's begin here.</p>

				<SearchBar handleRequest={this._handleRequest} />
				<SearchResults response={ this.state.response } />
				<MapResults />

			</div>
		);
	}
}