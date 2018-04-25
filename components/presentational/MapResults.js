import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MapLocation from '../containers/MapLocation'

export default class MapResults extends Component {
	render() {
		const { markers } = this.props; 

		const coordinateItems = markers.map( ( item ) => {
			let id = `tomodachi_${ Math.random()* (new Date()) }`;
			return (
				<MapLocation 
				  	position={{lat: item.coordinates.latitude, lng: item.coordinates.longitude  }}
				  	labelAnchor={new google.maps.Point(0, 0)}
				  	key={ `marker_${ id }` } 
				  	name={ item.name } />
			);
		});

		const MyMapComponent = withScriptjs(withGoogleMap(( props ) =>
			( <div>
			  	<GoogleMap
				    defaultZoom={ this.props.defaultzoom }
				    center={ this.props.center }
				    className="i"
				  >
				  {coordinateItems}
			  	</GoogleMap>
			 </div>
			)

		));

		return (
			<div className="Map_Results-Container">
				<MyMapComponent
				  isMarkerShown
				  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFDYz4Wa7MQr1NaXIy2CAdEa1_pqcU6AY&v=3.exp&libraries=geometry,drawing,places"
				  loadingElement={<div style={{ height: `100%` }} />}
				  containerElement={<div style={{ height: `400px` }} />}
				  mapElement={<div style={{ height: `100%` }} />}
				/>
			</div>
		);
		
	}
}