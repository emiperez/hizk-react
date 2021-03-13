import React from "react";
import LevelSelect from "./LevelSelect";
import LocaleSelect from "./LocaleSelect";
import RangeWithLabel from "./RangeWithLabel";
import config from "./config.json";

export default class Filter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			level: this.props.level,
			originLocale: this.props.originLocale,
			targetLocale: this.props.targetLocale,
			maxQuestions: parseInt(this.props.maxQuestions),
			latest: parseInt(this.props.latest),
			questionAmount: parseInt(this.props.questionAmount)
		};

		this.handleLevelChange = this.handleLevelChange.bind(this);
		this.handleOriginLocaleChange = this.handleOriginLocaleChange.bind(this);	
		this.handleTargetLocaleChange = this.handleTargetLocaleChange.bind(this);		
		this.handleChangeQuestionAmount = this.handleChangeQuestionAmount.bind(this);
		this.handleLatestChange = this.handleLatestChange.bind(this);
	}

	handleLevelChange(e) {
		console.log("QuestionFilter Level Changed: " + e.target.value);
		this.updateMaxQuestionsAfterUpdatingState({level: e.target.value});
	}

	handleOriginLocaleChange(e) {
		console.log("QuestionFilter OriginLocale Changed: " + e.target.value);
		this.updateMaxQuestionsAfterUpdatingState({originLocale: e.target.value});
	}

	handleTargetLocaleChange(e) {
		console.log("QuestionFilter TargetLocale Changed: " + e.target.value);
		this.updateMaxQuestionsAfterUpdatingState({targetLocale: e.target.value});
	}
	
	handleChangeQuestionAmount(e) {
		this.setState({
			questionAmount: e.target.value
		});
	}

	handleLatestChange(e) {
		this.setState({ latest: e.target.value });
	}

	componentDidMount() {
		this.updateMaxQuestions();
	}
	
	updateMaxQuestionsAfterUpdatingState(newState) {
		this.setState(newState, function() {this.updateMaxQuestions();});		
	}
	
	updateMaxQuestions() {
		fetch(config.apiUrl + "/translations/count/" + this.state.originLocale + "/" + this.state.targetLocale + "/" + this.state.level)
			.then(response => parseInt(response.text()))
			.then(data => this.setState({ maxQuestions: data }));		
	}

	render() {
		return (
			<div id="questionFilter">

				<LevelSelect id="questionFilterLevelSelect"
					onChange={this.handleLevelChange}
					defaultValue={this.state.level} />
				<LocaleSelect id="originLocale" defaultValue={this.state.originLocale} onChange={this.handleOriginLocaleChange} />
				<LocaleSelect id="targetLocale" defaultValue={this.state.targetLocale} onChange={this.handleTargetLocaleChange} />
				<RangeWithLabel
					id="questionAmount"
					min="5"
					max="20"
					onChange={this.handleChangeQuestionAmount}
					value={this.state.questionAmount} />
				<RangeWithLabel
					id="latest"
					min={this.state.questionAmount}
					max={this.state.maxQuestions}
					value={this.state.latest}
					onChange={this.handleLatestChange} />
			</div>
		);
	}
}
