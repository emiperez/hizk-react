import React from "react";
import propTypes from "prop-types";
import Term from "./Term";
import locales from "./locales.json";

export default class Translation extends React.Component {
	constructor(props) {
		super(props);
		this.handleSaveTranslation = this.handleSaveTranslation.bind(this);
		this.handleDeleteTranslation = this.handleDeleteTranslation.bind(this);
	}

	handleSaveTranslation() {
		alert("Save: " + this.props.origin + " / " + this.props.target);
	}

	handleDeleteTranslation() {
		alert("Delete: " + this.props.origin + " / " + this.props.target);
	}

	render() {
		let originMode = "label";
		let targetMode = "label";
		if (this.props.mode === "exam") {
			targetMode = "guess";
		}
		return (
			<div className="translation">
				<span className="translationTerm">
					<Term
						mode={originMode}
						locale={this.props.originLocale}
						value={this.props.origin}
					/>
				</span>
				<span className="translationTerm">
					<Term
						mode={targetMode}
						locale={this.props.targetLocale}
						value={this.props.target}
						onChange={this.props.onChange}
					/>
				</span>
				{this.props.mode === "print" && (
					<span className="translationEditButtons">
						<button onClick={this.handleEditTranslation}>Edit</button>
						<button onClick={this.handleDeleteTranslation}>Delete</button>
					</span>
				)}
			</div>
		);
	}
}

Translation.propTypes = {
	originLocale: propTypes.oneOf(locales),
	targetLocale: propTypes.oneOf(locales),
	mode: propTypes.oneOf(["new", "print", "edit", "exam"])
};
