import React from "react";
import propTypes from "prop-types";
import locales from "./locales.json";

export default function Term(props) {
	switch (props.mode) {
		case "label":
			return <label>{props.value}</label>;
		case "search":
			return <input className="searchTerm" type="text" onChange={props.onChange} />;
		case "guess":
			return <input className="guessTerm" type="text" onBlur={props.onChange} />;
	}
}

Term.propTypes = {
	locale: propTypes.oneOf(locales),
	mode: propTypes.oneOf(["label", "search", "guess"])
};
