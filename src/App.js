import React from "react";
import Filter from "./Filter";
import Term from "./Term";
import Translation from "./Translation";
import "./style.css";

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<>
				<div>
					<Filter level="A1" questionAmount="5" />
				</div>

				<div>
					<Term locale="es" mode="label" value="Hello World" />
				</div>

				<div>
					<Term locale="de" mode="search" value="Hello World" />
				</div>

				<div>
					<Translation
						origin="Origin"
						originLocale="de"
						target="Traducción"
						targetLocale="es"
						mode="new"
					/>
				</div>

				<div>
					<Translation
						origin="Origin"
						originLocale="de"
						target="Traducción"
						targetLocale="es"
						mode="edit"
					/>
				</div>
				<div>
					<Translation
						origin="Origin"
						originLocale="de"
						target="Traducción"
						targetLocale="es"
						mode="exam"
					/>
				</div>
			</>
		);
	}
}
