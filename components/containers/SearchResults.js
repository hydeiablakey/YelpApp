import React, {Component} from 'react';
import SearchResultButtons from '../presentational/SearchResultButtons';


export default class SearchResults extends Component {
	render() {
		const { response } = this.props; 
		const listItems = response.map( ( item ) => (
			<ul key={ `Sumimasen_${ Math.random() * (new Date()) }` }> 
				{ item.name }
			</ul>
			));
		return (

			<div className="Search_Results-Container">
			<p>It's Search Results </p>
			{ listItems }
			<SearchResultButtons />
			</div>
			
		)
	}
}