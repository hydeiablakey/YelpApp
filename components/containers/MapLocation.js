import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

export default class MapLocations extends Component {
	constructor() {
		super()
		this.state = ({
			isOpen: false,
		})
	}

	_handleOnClick = () => {
		this.setState({
			isOpen: true
		});
	}

	_handleOnCloseClick = () => {
		this.setState({
			isOpen: false
		});	
	}

	render() {
		return (
		 	<div>
				<Marker 
				  	className="marker"
				  	position={this.props.position}
				  	labelAnchor={this.props.labelAnchor}
				  	onClick={this._handleOnClick}
				 >

					{this.state.isOpen && 
						<InfoWindow onCloseClick={this._handleOnCloseClick}>
						<div className="marker_label_text">

						 <span className="name_marker">{ this.props.name }</span>

						 <img className="marker_img" src={`${ this.props.imageSrc }`} />

						 <span className="city_state_marker">{ this.props.city}, {this.props.state}, {this.props.zipcode} </span> 
						 

						</div>
					</InfoWindow> }
				</Marker>
			</div>
		);
		
	}
}

