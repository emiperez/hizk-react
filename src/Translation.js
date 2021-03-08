import React from "react";
import PropTypes from "prop-types";
import Term from "./Term";
import locales from "./locales.json";

export default class Translation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			origin: this.props.origin,
			originLocale: this.props.originLocale,
			target: this.props.target,
			targetLocale: this.props.targetLocale,
			mode: this.props.mode
		};
	}
	render() {
		let originMode = "search";
		let targetMode = "search";
		if (this.props.mode === "exam") {
			originMode = "label";
			targetMode = "edit";
		}
		return (
			<div className="translation">
				<span className="translationTerm">
					<Term
						mode={originMode}
						locale={this.state.originLocale}
						value={this.state.origin} />
				</span>
				<span className="translationTerm">
					<Term
						mode={targetMode}
						locale={this.state.targetLocale}
						value={this.state.target} />
				</span>
			</div>
		);
	}
}

Translation.PropTypes = {
	originLocale: PropTypes.oneOf(locales),
	targetLocale: PropTypes.oneOf(locales),
	mode: PropTypes.oneOf(["new", "edit", "exam"])
};
