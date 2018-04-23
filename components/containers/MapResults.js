import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { compose, withStateHandlers } from 'recompose';

export default class MapResults extends Component {

render() {
	const { markers } = this.props; 

	const MyMapComponent =  compose(
		withStateHandlers(() => ({ 
					isOpen: false,
				}), {
		onToggleOpen: ({ isOpen }) => () => ({
						isOpen: !isOpen,
					})
				}),

		withScriptjs,
		withGoogleMap
		)( ( props ) => 
			<div>
		  	<GoogleMap
			    defaultZoom={ this.props.defaultzoom }
			    center={ this.props.center }
			    className="GoogleMap"
			  >

			  { markers.map(( item ) => {
					let id = `tomodachi_${ Math.random()* (new Date()) }`;

					return (
						<div key={ `marker_${ id }` }>
								<Marker 
								  	className="marker-item"
								  	position={{lat: item.coordinates.latitude, lng: item.coordinates.longitude  }}
								  	labelAnchor={new google.maps.Point(0, 0)}
								  	onClick={props.onToggleOpen}	
								>

								{props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
	
								<div className="marker_label_text">{item.name}</div>
			      		</InfoWindow>}
			      		
								</Marker>
						</div>
					);
				})
		  }
		  </GoogleMap>
		</div>
		);

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