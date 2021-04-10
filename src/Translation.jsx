import React from "react";
import propTypes from "prop-types";
import Term from "./Term";
import TermNew from "./TermNew";
import DeleteButton from "./DeleteButton"
import config from "./config.json";

export default class Translation extends React.Component {
	constructor(props) {
		super(props);
		this.state = { mode: props.mode, 
						object: { origin: { id: null, locale: "de", text: null }, 
									meaning: { id: null, locale: "es", text: null } } };
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleClickSave = this.handleClickSave.bind(this);
	}

	handleClickSave() {
		alert("Save: " + JSON.stringify(this.state.object.origin) + " / " + JSON.stringify(this.state.object.meaning));
	}

	handleClickDelete() {
		const url = config.apiUrl + "/translations/" + this.props.object.origin.id + "/" + this.props.object.meaning.id;
		console.log("DELETE URL: " + url);
		fetch(url,
			{
				method: "DELETE"
			})
			.then(response => response.text())
			.then(() => this.props.onDelete())
			.catch(error => alert("Could not be deleted: " + error));
	}

	render() {
		let originMode = "label";
		let meaningMode = originMode;
		if (this.state.mode === "exam") {
			meaningMode = "guess";
		}
		return (
			<div className="translation">
				<span className="translationTerm">
					<Term
						mode={originMode}
						value={this.props.object.origin}
					/>
				</span>
				<span className="translationTerm">
					<Term
						mode={meaningMode}
						value={this.props.object.meaning}
						onChange={this.props.onChange}
					/>
				</span>
				{ this.state.mode == "print" && (
					<span className="translationButtons">
						<DeleteButton onClick={this.handleClickDelete} />
					</span>
				)}
			</div>
		);
	}
}

Translation.propTypes = {
	mode: propTypes.oneOf(["print", "exam"])
};
