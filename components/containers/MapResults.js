import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import ReactTooltip from 'react-tooltip';


export default class MapResults extends Component {

render() {
	const { markers } = this.props; 
	const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


	const coordinateItems = markers.map(( item ) => {
		let id = `tomodachi_${ Math.random()* (new Date()) }`;

		return (
			<div key={ `marker_${ id }` }>
					<MarkerWithLabel 
					  	className="marker-item"
					  	position={{lat: item.coordinates.latitude, lng: item.coordinates.longitude  }}
					  	labelAnchor={new google.maps.Point(0, 0)}
					  	labelStyle={{backgroundColor: "white", fontSize: "12px", padding: "8px", border: "1px solid pink", display: "none"}} 
					>
					<div className="marker_label_text">{item.name}</div>
					</MarkerWithLabel>
			</div>
			);
		});



	const MyMapComponent = withScriptjs( withGoogleMap( ( props ) =>
		(<div>
	  	<GoogleMap
		    defaultZoom={9}
		    center={ this.props.center }
		    className="i"
		  >
		  	{coordinateItems}

	  	</GoogleMap>
		</div>)
	 	));

	return (
		 <div className="Map_Results-Container">
			<MyMapComponent
			  isMarkerShown
			  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
			  loadingElement={<div style={{ height: `100%` }} />}
			  containerElement={<div style={{ height: `400px` }} />}
			  mapElement={<div style={{ height: `100%` }} />}
			/>

		 </div>
		);
	}
}