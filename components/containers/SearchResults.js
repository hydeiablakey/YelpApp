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


		return (
			<div className="Search_Results-Container">
			<p className="searchResults_title">It's Search Results: </p>
			{ listItems }

			<SearchResultButtons />

			</div>

		)
	}
}