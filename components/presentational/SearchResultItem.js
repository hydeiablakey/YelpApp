import React, {Component} from 'react'; 


export default class SearchResultItem extends Component {
	render() {
		return (	
			<div className="searchResultItem_container">
			<img className="item_Images" src={`${ this.props.imageSrc }`} />
			</div>
		);
	}
}