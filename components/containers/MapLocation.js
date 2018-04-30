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
				  	className="marker-item"
				  	position={this.props.position}
				  	labelAnchor={this.props.labelAnchor}
				  	onClick={this._handleOnClick}
				 >

					{this.state.isOpen && 
						<InfoWindow onCloseClick={this._handleOnCloseClick}>
						<div className="marker_label_text">
						 <p>{ this.props.name }</p>
						 <span> { this.props.city}, {this.props.state} {this.props.zip} </span> 
						 <p> Rating: {this.props.rating}</p>

						</div>
					</InfoWindow> }
				</Marker>
			</div>
		);
		
	}
}

