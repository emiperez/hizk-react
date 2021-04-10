import React from "react";
import LevelSelect from "./LevelSelect";
import TermNew from "./TermNew";
import TranslationList from "./TranslationList";
import config from "./config.json";

export default class Record extends React.Component {
	constructor(props) {
		super(props);
		this.state = { latest: [], origin: null, meaning: null, level: "A1" };
		this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
		this.handleChangeMeaning = this.handleChangeMeaning.bind(this);
		this.handleClickSave = this.handleClickSave.bind(this);
	}

	handleChangeOrigin(newValue) {
		console.log("Record.handleChangeOrigin: " + JSON.stringify(newValue));
		this.setState({ origin: newValue });
	}

	handleChangeMeaning(newValue) {
		console.log("Record.handleChangeMeaning: " + JSON.stringify(newValue));
		this.setState({ meaning: newValue });
	}

	handleClickSave() {
		const translation = {origin: this.state.origin, meaning: this.state.meaning, level: this.state.level};
		const strTranslation = JSON.stringify(translation);
		console.log("Record.handleSave: " + strTranslation);
		fetch(config.apiUrl + "/translations/",
			{
				headers: { 'Content-Type': 'application/json' },
				method: "POST", body: strTranslation
			})
			.then(response => response.json())
			.then(data => this.setState({ latest: [data, ...this.state.latest] }));
	}

	loadTranslations() {
		console.log("Record.loadTranslations");
		fetch(config.apiUrl + "/translations")
			.then(response => response.json())
			.then(data => this.setState({ latest: data }));
	}

	componentDidMount() {
		this.loadTranslations();
	}

	render() {
		return (
			<>
				<h1>New Translation</h1>
				<div>
					<label>Level</label>
					<LevelSelect
						value={this.state.level}
						onChange={e => this.setState({ level: e.target.value })} />
					<label>{config.originLocale}</label> <TermNew locale={config.originLocale} onChange={this.handleChangeOrigin} />
					<label>{config.meaningLocale}</label> <TermNew locale={config.meaningLocale} onChange={this.handleChangeMeaning} />
					<span className="translationEditButtons">
						<button onClick={this.handleClickSave}>Save</button>
					</span>
				</div>
				<h2>Latest</h2>
				<TranslationList
					translations={this.state.latest}
					onDeleteTranslation={() => this.loadTranslations()} />
			</>
		);
	}
}