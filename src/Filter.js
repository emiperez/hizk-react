import React from "react";
import LevelSelect from "./LevelSelect";
import config from "./config.json";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      level: this.props.level,
      maxQuestions: 6,
      questionAmount: parseInt(this.props.questionAmount)
    };

    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleChangeQuestionAmount = this.handleChangeQuestionAmount.bind(
      this
    );
  }

  handleLevelChange(e) {
    fetch(config.apiUrl + "/translations/count/es/de/" + e.target.value)
      .then(response => response.text())
      .then(data => this.setState({ maxQuestions: parseInt(data) }));
  }

  handleChangeQuestionAmount(e) {
    this.setState({
      questionAmount: e.target.value
    });
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
        <div>{this.state.maxQuestions}</div>
      </>
    );
  }
}
