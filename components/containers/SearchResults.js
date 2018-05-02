import React, {Component} from 'react';
import SearchResultButtons from '../presentational/SearchResultButtons';


export default class SearchResults extends Component {

	_getColor = ( rating ) => {
		//some sort of logic here that spits out a color
		// this will generate a hed value

		return '#000';
	}

	render() {
		const { response } = this.props;

		const listItems = response.map(( item ) => {
			const rating = item.rating;
			console.log(rating);

			// if (rating > 0 && rating <= 1 ) {
			// 	document.getElementById()
			// }

			return (
				<li className="searchItem" key={ `Sumimasen_${ Math.random() * (new Date()) }` }> 
					<span className="searchName">{ item.name }</span>
					<span className="rating" style={{ color: this._getColor( item.rating )}}>{ item.rating }</span>
				</li>
			)
		})


		

		//response will always exist as it's being passed down first as an empty array. 
		if (response.length > 0) {
			return (
			<div className="Search_Results-Container">
				<h2 className="searchResults_title">Search Results: {this.props.term}</h2>
				<ul className="searchItems" style={ { listStyle: 'none'} } >
					{ listItems }
				</ul>
				<SearchResultButtons />
			</div>
			)
		} 

		return (
			<div className="Default_search-container">
				<p>Welcome to a default search message. </p>
					<hr width="50%" />
				<div className="prompt">
					<p className="prompt_msg">This is a box full of information. Use it wisely!</p>
				</div>
			</div>
		)
	}
}