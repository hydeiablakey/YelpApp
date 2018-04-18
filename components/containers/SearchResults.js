import React, {Component} from 'react';
import SearchResultButtons from '../presentational/SearchResultButtons';
import SearchResultItem from '../presentational/SearchResultItem';

export default class SearchResults extends Component {
	render() {
		const { response } = this.props; 
		const listItems = response.map( ( item ) => (
			<ul className="item" key={ `Sumimasen_${ Math.random() * (new Date()) }` }> 
				<p>{ item.name }</p>
				<p> Price range: {item.price}</p>
				<p> Location: {item.location.address1}</p>
			</ul>
			));

		return (

			<div className="Search_Results-Container">
			<p>It's Search Results: </p>
			{ listItems }

			<SearchResultButtons />

			</div>

		)
	}
}