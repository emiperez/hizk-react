import React from "react";
import QuestionFilter from "./QuestionFilter";
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
					<QuestionFilter 
						level="B1" 
						originLocale="es"
						targetLocale="de"
						questionAmount="5" 
						latest={100} />
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
			</>
		);
	}
}
