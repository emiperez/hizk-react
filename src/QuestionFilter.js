import React from "react";
import LevelSelect from "./LevelSelect";
import LocaleSelect from "./LocaleSelect";
import RangeWithLabel from "./RangeWithLabel";
import config from "./config.json";

export default class QuestionFilter extends React.Component {
	constructor(props) {
		super(props);
		console.log("CASE SENSITIVE: " + props.caseSensitive);
		this.state = {
			level: this.props.level,
			questionLocale: this.props.questionLocale,
			answerLocale: this.props.answerLocale,
			caseSensitive: this.props.caseSensitive,
			maxQuestions: parseInt(this.props.maxQuestions),
			latest: parseInt(this.props.latest),
			questionAmount: parseInt(this.props.questionAmount)
		};

		this.handleLevelChange = this.handleLevelChange.bind(this);
		this.handleQuestionLocaleChange = this.handleQuestionLocaleChange.bind(this);
		this.handleAnswerLocaleChange = this.handleAnswerLocaleChange.bind(this);
		this.handleChangeQuestionAmount = this.handleChangeQuestionAmount.bind(this);
		this.handleLatestChange = this.handleLatestChange.bind(this);
		this.handleStartExamClick = this.handleStartExamClick.bind(this);
	}

	handleLevelChange(e) {
		this.updateMaxQuestionsAfterUpdatingState({ level: e.target.value });
	}

	handleQuestionLocaleChange(e) {
		this.updateMaxQuestionsAfterUpdatingState({ questionLocale: e.target.value });
	}

	handleAnswerLocaleChange(e) {
		this.updateMaxQuestionsAfterUpdatingState({ answerLocale: e.target.value });
	}

	handleChangeQuestionAmount(e) {
		this.setState({ questionAmount: e.target.value });
	}

	handleLatestChange(e) {
		this.setState({ latest: e.target.value });
	}

	handleStartExamClick() {
		let parentFunction = this.props.onStartExam;
		console.log("JSON: " + JSON.stringify(this.state));
		fetch(config.apiUrl + '/exams', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				parentFunction(data);
			})
			.catch(function(error) {
				console.error(error);
			})
	}

	componentDidMount() {
		this.updateMaxQuestions();
	}

	updateMaxQuestionsAfterUpdatingState(newState) {
		this.setState(newState, function() { this.updateMaxQuestions(); });
	}

	updateMaxQuestions() {
		fetch(config.apiUrl + "/translations/count/" + this.state.questionLocale + "/" + this.state.answerLocale + "/" + this.state.level)
			.then(response => parseInt(response.text()))
			.then(data => this.setState({ maxQuestions: data }));
	}

	render() {
		return (
			<>
				<div id="questionFilter">

					<LevelSelect onChange={this.handleLevelChange} defaultValue={this.state.level} />
					<LocaleSelect defaultValue={this.state.questionLocale} onChange={this.handleQuestionLocaleChange} />
					<LocaleSelect defaultValue={this.state.answerLocale} onChange={this.handleAnswerLocaleChange} />
					<input type="checkbox" defaultChecked={this.state.caseSensitive} />
					<RangeWithLabel
						id="questionAmount"
						min={5}
						max={20}
						onChange={this.handleChangeQuestionAmount}
						defaultValue={this.state.questionAmount} />
					<RangeWithLabel
						id="latest"
						min={this.state.questionAmount}
						max={this.state.maxQuestions}
						defaultValue={this.state.latest}
						onChange={this.handleLatestChange} />
					<button onClick={this.handleStartExamClick}>Start Exam</button>
				</div>
				<div id="exam">
				</div>
			</>
		);
	}
}
