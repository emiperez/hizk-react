import React from "react";
import propTypes from "prop-types";
import locales from "./locales.json";

export default class Term extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			locale: this.props.locale,
			mode: this.props.mode
		};
	}
	render() {
		switch (this.props.mode) {
			case "label":
				return <label>{this.props.value}</label>;
			case "search":
				return <input className="searchTerm" type="text" />;
			case "guess":
				return <input className="guessTerm" type="text" />;
		}
	}
}

Term.propTypes = {
	locale: propTypes.oneOf(locales),
	mode: propTypes.oneOf(["label", "search", "guess"])
};
