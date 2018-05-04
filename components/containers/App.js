import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import SearchBar from '../presentational/SearchBar';
import MarkerMap from '../presentational/MarkerMap';
import MapLocation from './MapLocation';
import './App.less';


/* 	States
	Response: Takes an empty array because it's expecting to be filled by the request for locations. 
	Term: Expecting a search term from the search bar. (Not Required.)
	Location: Expecting a location term from the search bar. (Required)
	Center: Corresponds to the center of the map from the API based on the search term. Accepts a Lat and Long. 
	DefaultZoom: Amount that the map is zoomed in by default. 
	SelectedId: The id currently being selected in the search results

*/

export default class App extends Component {
	constructor() {
		super()
		this.state = ({
			response: [],
			term: "",
			location: "",
			center: { 
				lat: 40.854131, //default location placed in NYC.
				lng: -73.886601 //default location placed in NYC.
			},
			defaultZoom: 9,
			selectedId: ''
		})
	}
	
	/*	_Handlerequest
	1. Handlerequest is expecting a search term and a location to be passed into the url. 
	2. Once a term and location is passed from the handleSearch function, it is concat onto the url for the api call.
	3. Axios makes a get request based on the search term and responds with json.
	*/

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

		/*
		1. Takes the response and sets the state to the new response provided by the API. 
		*/
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
		    console.log("Response: ", this.state.response );
		})

		.catch( ( error ) => {
			console.error( error );
		})
	}

	/* _Handlesearch
	1. Grabs the termQuery and locationQuery by tagName from the searchBar input value.
	2. Passing in the termQuery and locationQuery from the searchBar to the handleRequest function. 
	3. Setting the state to the new term and location queries. 
	*/

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


/* _onItemClick 
1. Expecting a termId (SearchResultId) and it is performing a currying operation with event. 
2. Setting the state to the termId which is grabbed from the SearchResults component when you click on a search result item.

*/
	_onItemClick = ( termId ) => ( event ) => {
		this.setState({
			selectedId: termId
		})
	}

/* _getCoordinateItems (Originally was MapResults)

1. Maps out each response search result to a marker item. 
2. Passes several props to MapLocation which holds the functions for the marker items. 

*/
	_getCoordinateItems = () => {
			const markers = this.state.response;
			const coordinateItems = markers.map( ( item ) => {
				let id = item.id;

				return (
					<MapLocation 
						markerID={ `marker_${ id }` } //ID from the restaurant with marker. 
						itemID={ this.state.selectedId } //ID from the item being searched
				  	position={{lat: item.coordinates.latitude, lng: item.coordinates.longitude  }}
				  	labelAnchor={new google.maps.Point(0, 0)}
				  	key={ `marker_${ id }` } 
				  	name={ item.name }
				  	address={item.location.address1}
				  	city={item.location.city}
				  	state={item.location.state}
				  	zipcode={item.location.zip_code}
				  	imageSrc={item.image_url}
				  	isSelected={ id === this.state.selectedId }
					/>
				);
		});

		console.log("coordinateItems", coordinateItems)
		return coordinateItems;
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
			 		<SearchResults term={this.state.term} response={ this.state.response } onItemClick={ this._onItemClick } />
			 		<MarkerMap defaultzoom={this.state.defaultZoom} center={ this.state.center }>
			 			{ this._getCoordinateItems() }
			 		</MarkerMap>
			 	</div>
			</div>
		);
	}
}