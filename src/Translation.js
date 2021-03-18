import React from "react";
import propTypes from "prop-types";
import Term from "./Term";
import locales from "./locales.json";

export default class Translation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.id,
			origin: this.props.origin,
			originLocale: this.props.originLocale,
			target: this.props.target,
			targetLocale: this.props.targetLocale,
			mode: this.props.mode
		};
		this.handleSaveTranslation = this.handleSaveTranslation.bind(this);
		this.handleDeleteTranslation = this.handleDeleteTranslation.bind(this);
	}

	handleSaveTranslation() {
		alert("Save: " + this.state.origin + " / " + this.state.target);
	}

	handleDeleteTranslation() {
		alert("Delete: " + this.state.origin + " / " + this.state.target);
	}

	render() {
		let originMode = "search";
		let targetMode = "search";
		if (this.props.mode === "exam") {
			originMode = "label";
			targetMode = "guess";
		}
		return (
			<div className="translation">
				<span className="translationTerm">
					<Term
						mode={originMode}
						locale={this.state.originLocale}
						value={this.state.origin}
					/>
				</span>
				<span className="translationTerm">
					<Term
						translation={targetMode == "guess" && this.props.id}
						mode={targetMode}
						locale={this.state.targetLocale}
						value={this.state.target}
						onChange={this.props.onChange}
					/>
				</span>
				{this.state.mode === "edit" && (
					<span className="translationEditButtons">
						<button onClick={this.handleSaveTranslation}>Save</button>
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
	mode: propTypes.oneOf(["new", "edit", "exam"])
};
