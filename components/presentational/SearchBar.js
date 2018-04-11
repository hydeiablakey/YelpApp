import React, {Component} from 'react'; 


export default class SearchBar extends Component {
	render() {
		return (
			<div className="Search_Bar-container">

				<p>Searching.</p>
				<form className="Form" onSubmit={this.props.handleRequest}>
					<input id="term" className="inputSearch_term" placeholder="Search restaurants, bars, anything here" type="text" />
					<input id="location" className="locationSearch_term" placeholder="Where are you?" type="text" required/>
					<input className="submitButton" type="submit"></input>

				</form>

			</div>
		)
	}
}