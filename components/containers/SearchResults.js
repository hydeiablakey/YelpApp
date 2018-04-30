import React, {Component} from 'react';
import SearchResultButtons from '../presentational/SearchResultButtons';
import SearchResultItem from '../presentational/SearchResultItem';

export default class SearchResults extends Component {
	render() {
		const { response } = this.props; 
		const listItems = response.map( ( item ) => (
			<ul className="searchItem" key={ `Sumimasen_${ Math.random() * (new Date()) }` }> 
				<p>{ item.name }</p>
				<p> Price range: {item.price}</p>
				<p> Location: {item.location.address1}</p>

				<SearchResultItem imageSrc={ item.image_url } />
			</ul>
			));

		//response will always exist as it's being passed down first as an empty array. 
		if (response.length > 0) {
			return (
			<div className="Search_Results-Container">
			<p className="searchResults_title">Search Results:</p>
			{ listItems }
			<SearchResultButtons />
			</div>
			)
		} 

		return (
			<div className="Default_search-container">
			<p>Welcome to a default search message. </p>
			<hr width="50%" />
			<div className="prompt">
			<p className="prompt_msg">This is a box full of information. Use wisely!</p>
			</div>
			</div>

		)
	}
}