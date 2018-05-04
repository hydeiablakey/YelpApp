import React, {Component} from 'react'; 
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

export default class MarkerMap extends Component {
	render() {
	 const MyMapComponent = withScriptjs(withGoogleMap(( props ) =>
		( <div>
		  	<GoogleMap
					defaultZoom={ this.props.defaultzoom }
					center={ this.props.center }
					className="i"
				>
					{ this.props.children }

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