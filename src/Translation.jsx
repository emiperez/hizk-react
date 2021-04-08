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

	handleChangeOrigin(e) {
		this.setState(prevState => ({
			origin: {
				...prevState.origin,
				text: {
					text: e.target.value
				}
			}
		}))
	}

	handleChangeMeaning(e) {
		this.setState(prevState => ({
			meaning: {
				...prevState.meaning,
				text: {
					text: e.target.value
				}
			}
		}))
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
			.then(this.props.onDelete())
			.catch(error => alert("Could not be deleted: " + error));
		console.log("onDelete.name=" + this.props.onDelete.name);
		this.props.onDelete();
	}

	render() {
		let originMode, meaningMode;
		switch (this.state.mode) {
			case "new":
				return (
					<div>
						<TermNew onChange={() => this.handleChangeOrigin} value={this.state.object.origin} />
						<TermNew onChange={() => this.handleChangeMeaning} value={this.state.object.meaning} />
						<span className="translationEditButtons">
							<button onClick={this.handleClickSave}>Save</button>
						</span>
					</div>);
			case "print":
				originMode = meaningMode = "label";
				break;
			case "exam":
				originMode = "label";
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
				{["edit", "new"].includes(this.state.mode) && (
					<span className="translationEditButtons">
						<button onClick={this.handleClickCancelEdit}>Cancel</button>
						<button onClick={this.handleClickSave}>Save</button>
					</span>
				)}
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
	mode: propTypes.oneOf(["new", "print", "exam"])
};
