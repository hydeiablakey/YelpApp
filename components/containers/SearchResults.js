import React, {Component} from 'react';
import SearchResultButtons from '../presentational/SearchResultButtons';


export default class SearchResults extends Component {

//work on getting a map element to display on click for a search result.
	_getColor = ( rating ) => {
		
		if ( rating > 0 && rating < 2 ) {
			return '#F0152D';
		} else if (rating >=2 && rating < 3) {
			return '#F08E2D'
		} else if (rating >=3 && rating < 4 ) {
			return '#F0B52D'
		} else if (rating >=4 &&  rating < 5 ) {
			return '#A0B62A'
		} else {
			return '#1EA82A'
		}

	}

	render() {
		const { response, onItemClick } = this.props;

		const listItems = response.map(( item ) => {
			const rating = item.rating;
			const name = item.name;
			const id = item.id; 

			//console.log(rating); debugging'

			//OnItemClick is grabbing the ID from the Parent app.js  when clicking on a searchresult item. 
			return (
				<li className="searchItem" key={ `Sumimasen_${ Math.random() * (new Date()) }` }> 
					<span  onClick={ onItemClick( id ) } className="searchName">{ name }</span>
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
					<p className="prompt_msg">Box of information. Use it wisely!</p>
				</div>
			</div>
		)
	}
}