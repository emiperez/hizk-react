import React from "react";
import { withRouter } from "react-router";
import DeleteButton from "./DeleteButton";
import TranslationList from "./TranslationList";
import config from "./config.json";

class TermEditor extends React.Component {
	constructor(props) {
		super(props);
		this.id = props.match.params.id;
		this.state = {term: {id: -1, locale: null, text: ""}, translations: []};
	}
	
	handleChangeTerm(e) {
		this.setState((state) => {
			let term = this.state.term;
			term.text = e.target.value;
			return ({term: term});
		});
	}
	
	handleSave() {
		console.log("Term Save");
		fetch(config.apiUrl + "/terms/",
			{
				headers: { 'Content-Type': 'application/json' },
				method: "PUT", body: JSON.stringify(this.state.term)
			})
			.then(response => response.json())
			.then(data => this.setState({ term: data }));
		this.loadTranslations();
	}
	
	handleDelete() {
		console.log("Term Delete");
	}
	
	componentDidMount() {
		console.log("TermEditor did Mount");
		fetch(config.apiUrl + "/terms/" + this.id)
				.then(response => response.json())
				.then(data => this.setState({ term: data }));
		this.loadTranslations();
	}
	
	render() {
		return (
			<>
			<h1>Term editor</h1>
			<div ><input type="text" value={this.state.term.text} onChange={(e) => this.handleChangeTerm(e)}/>
				<button 
					disabled={this.state.term.id < 0 || !this.state.term.locale || !this.state.term.text} 
					onClick={() => this.handleSave()}>Save</button>
				<DeleteButton  onClick={() => this.handleDelete()} />
			</div>
			<h2>Translations</h2>
			<TranslationList translations={this.state.translations} />
			</>
		);
	}
	
	loadTranslations() {	
		fetch(config.apiUrl + "/translations/?termId=" + this.id)
			.then(response => response.json())
			.then(data => this.setState({ translations: data }));		
	}
}

export default withRouter(TermEditor);