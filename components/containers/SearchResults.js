import React, {Component} from 'react';
import SearchResultButtons from '../presentational/SearchResultButtons';


export default class SearchResults extends Component {

/* _getColor
1. Takes in a rating from the response and uses it to configure which color to return.
2. Once a color is chosen based on the if/else statements, it executes this._getColor within the span element rating. 
*/
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

		/* listItems
		  1. Listitems is the map of responses for item.name and item.rating for each search result. 
	      2. The onClick for name, will take in the onItemClick and pass the id for the searchResult item to the App comp.
	      3.Displays a list(which is placed in an unordered list later) of name and ratings for each search result item. 
		*/
		const listItems = response.map(( item ) => {
			const rating = item.rating;
			const name = item.name;
			const id = item.id; 

			//OnItemClick is grabbing the ID from the Parent app.js  when clicking on a searchresult item. 
			return (
				<li className="searchItem" key={ `Sumimasen_${ Math.random() * (new Date()) }` }> 
					<span  onClick={ onItemClick( id ) } className="searchName">{ name }</span>
					<span className="rating" style={{ color: this._getColor( item.rating )}}>{ item.rating }</span>
				</li>
			)
		})


		

		//response will always exist as it's being passed down first as an empty array. 
		/*
		 1. This is checking if the response that is being passed is greater than 0. (Meaning if there is a response)
			When there is a response, we want to show this container. 
			If not, we want to return the default search container, as to avoid showing an empty box of search results. 
			2. Listitems are displaying the results from the response which are item.name and item.rating within the unordered list
		*/
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

		/*
		This default search container is shown when there is no response being given in search results.
		*/
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