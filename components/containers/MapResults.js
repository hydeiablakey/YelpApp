import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

export default class MapResults extends Component {
	render() {
		const { markers } = this.props; 

		const coordinateItems = markers.map((item) => (
				<div>

			 <Marker  
			 	onClick={this._onZoom}
			  className="marker-item" 
			  position={{lat: item.coordinates.latitude, lng: item.coordinates.longitude  }} 
			  key={`tomodachi_${Math.random()* (new Date())}`} />

				</div>

			));


	const MyMapComponent = withScriptjs( withGoogleMap( ( props ) =>
	(<div>
  	<GoogleMap
	    defaultZoom={5}
	    defaultCenter={{ lat: 40.83622, lng:  -73.85488}}
	  >

	  	{coordinateItems}

	  		{/*<Marker position={{lat: 40.83622, lng: -73.85488 }} />
	      <Marker position={{lat: 40.827751, lng: -73.850389  }} />*/}
  	</GoogleMap>

	</div>)
 	));
		/*
 		_onZoom = () => {
			coordinateItems.setZoom(8);
			
		}
		*/
 	


		return (
		 <div className="Map_Results-Container">
			<MyMapComponent
			  isMarkerShown
			  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
			  loadingElement={<div style={{ height: `100%` }} />}
			  containerElement={<div style={{ height: `400px` }} />}
			  mapElement={<div style={{ height: `100%` }} />}
			/>

			{coordinateItems}
		 </div>


		)
	}
}