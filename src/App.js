import React from "react";
import LevelSelect from "./LevelSelect";
import "./style.css";

class Filter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			level: this.props.level,
			maxQuestions: 6,
			questionAmount: parseInt(this.props.questionAmount)
		};

		this.handleLevelChange = this.handleLevelChange.bind(this);
		this.handleChangeQuestionAmount = this.handleChangeQuestionAmount.bind(this);
	}

	handleLevelChange() {
		this.setState({	maxQuestions: state.maxQuestions + 1});
	}

	handleChangeQuestionAmount() {
		this.setState(state => ({
			questionAmount: e.target.value
		}));
	}

	render() {
		return (
			<>
				<LevelSelect
					onChange={this.handleLevelChange}
					value={this.state.level}
				/>
				<input
					id="questionAmount"
					type="range"
					max={this.state.maxQuestions}
					onChange={this.handleChangeQuestionAmount}
				/>
				<span id="questionAmount">{this.state.questionAmount}</span>
			</>
		);
	}
}

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <Filter level="A1" questionAmount="5" />;
	}
}
