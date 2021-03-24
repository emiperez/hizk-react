import React from "react";
import propTypes from "prop-types";
import Term from "./Term";
import config from "./config.json";

export default class Translation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {mode: props.mode};
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.handleClickCancelEdit = this.handleClickCancelEdit.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleClickSave = this.handleClickSave.bind(this);
	}

	handleClickEdit() {
		this.setState({mode: "edit"});
	}
	
	handleClickCancelEdit() {
		this.setState({mode: "print"});
	}

	handleClickDelete() {
		const url = config.apiUrl + "/translations/" + this.props.origin.id + "/" + this.props.meaning.id;
		fetch(url,
			{
				method: "DELETE"
			})
			.then(response => response.text())
			.then(this.props.onDelete())
			.catch(error => alert("Could not be deleted: " + error));
	}

	handleClickSave() {
		alert("Save: " + JSON.stringify(this.props.origin) + " / " + JSON.stringify(this.props.meaning));
	}

	render() {
		//Initialize values to default "edit" and "new" Term's modes'
		let originMode = "search";
		let meaningMode = "search";
			
		switch (this.state.mode) {
			case "print":
				originMode = meaningMode = "label";
				break;
			case "exam":
				originMode = "label";
				meaningMode = "guess";
		}
		if (this.state.mode === "exam") {
			meaningMode = "guess";
		}
		return (
			<div className="translation">
				<span className="translationTerm">
					<Term
						mode={originMode}
						value={this.props.origin}
					/>
				</span>
				<span className="translationTerm">
					<Term
						mode={meaningMode}
						value={this.props.meaning}
						onChange={this.props.onChange}
					/>
				</span>
				{ ["edit", "new"].includes(this.state.mode) && (
					<span className="translationEditButtons">
						<button onClick={this.handleClickCancelEdit}>Cancel</button>
						<button onClick={this.handleClickSave}>Save</button>
					</span>
				)}
				{ this.state.mode == "print" && (
					<span className="translationButtons">
						<button onClick={this.handleClickEdit}>Edit</button>
						<button onClick={this.handleClickDelete}>Delete</button>
					</span>
				)}
			</div>
		);
	}
}

Translation.propTypes = {
	mode: propTypes.oneOf(["new", "print", "edit", "exam"])
};
