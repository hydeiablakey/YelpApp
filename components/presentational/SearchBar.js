import React, {Component} from 'react'; 


export default class SearchBar extends Component {
	render() {
		return (
			<div className="Search_Bar-container">
				<form className="Form" onSubmit={ this.props.handleSearch }>
					<input className="inputSearch_term" placeholder="Find restaurants, bars, cupcakes and anything of relevance here" type="text" />
					<input className="locationSearch_term" placeholder="Where are you located?* " type="text" required/>
					<input className="submitButton" type="submit"></input>
				</form>

			</div>
		)
	}
}