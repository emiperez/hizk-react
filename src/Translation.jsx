import React from "react";
import propTypes from "prop-types";
import Term from "./Term";
import DeleteButton from "./DeleteButton"
import config from "./config.json";
import LevelSelect from "./LevelSelect";

export default class Translation extends React.Component {
	constructor(props) {
		super(props);
		this.state = { mode: props.mode, object: this.props.object };
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleUpdateLevel = this.handleUpdateLevel.bind(this);
	}

	handleUpdateLevel(e) {
		this.setState( (prevState) => ({ object: { ...prevState.object, level: e.target.value} }), () => this.sendUpdate());
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
						<LevelSelect 
							value={this.state.object.level} 
							onChange={(e) => this.handleUpdateLevel(e)} />
						<DeleteButton onClick={this.handleClickDelete} />
					</span>
				)}
			</div>
		);
	}
	
	sendUpdate() {
		fetch(config.apiUrl + "/translations/",
			{
				headers: { 'Content-Type': 'application/json' },
				method: "PUT", body: JSON.stringify(this.state.object)
			})
			.then(response => response.json())
			.then(data => this.setState({ object: data }));		
	}
}

Translation.propTypes = {
	mode: propTypes.oneOf(["print", "exam"])
};
