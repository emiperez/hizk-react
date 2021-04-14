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
		this.setState({ origin: newValue });
	}

	handleChangeMeaning(newValue) {
		this.setState({ meaning: newValue });
	}

	handleClickSave() {
		const translation = {origin: this.state.origin, meaning: this.state.meaning, level: this.state.level};
		const strTranslation = JSON.stringify(translation);
		fetch(config.apiUrl + "/translations/",
			{
				headers: { 'Content-Type': 'application/json' },
				method: "POST", body: strTranslation
			})
			.then(response => response.json())
			.then(data => this.setState({ latest: [data, ...this.state.latest] }));
		this.levelSelect.select.focus();
	}

	loadTranslations() {
		console.log("Record.loadTranslations");
		fetch(config.apiUrl + "/translations")
			.then(response => response.json())
			.then(data => this.setState({ latest: data }));
	}

	componentDidMount() {
		this.loadTranslations();
		this.levelSelect.select.focus();
	}

	render() {
		return (
			<>
				<h1>New Translation</h1>
				<div>
					<label>Level</label>
					<LevelSelect
						ref={(ls) => this.levelSelect = ls}
						autoFocus
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