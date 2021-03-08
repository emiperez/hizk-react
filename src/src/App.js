import React from "react";
import LevelSelect from "./LevelSelect";
import Term from "./Term";
import Translation from "./Translation";
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
    this.handleChangeQuestionAmount = this.handleChangeQuestionAmount.bind(
      this
    );
  }

  handleLevelChange() {
    console.log(
      "mQ: " + this.state.maxQuestions + " / qA: " + this.state.questionAmount
    );
    this.setState(state => ({
      maxQuestions: state.maxQuestions + 1
    }));
  }

  handleChangeQuestionAmount(e) {
    console.log(
      "mQ: " + this.state.maxQuestions + " / qA: " + this.state.questionAmount
    );
    console.log(e);
    this.setState(state => ({
      questionAmount: this.state.questionAmount + 1
    }));
  }

  render() {
    return (
      <>
        <p>
          <LevelSelect
            onChange={this.handleLevelChange}
            value={this.state.level}
          />
        </p>

        <p>
          <input
            id="questionAmount"
            type="range"
            max={this.state.maxQuestions}
            onChange={this.handleChangeQuestionAmount}
          />
          <span id="questionAmount">{this.state.questionAmount}</span>
        </p>

        <p>
          <Term locale="es" mode="label" value="Hello World" />
        </p>

        <p>
          <Term locale="dn" mode="search" value="Hello World" />
        </p>

        <p>
          <Translation
            origin="Origin"
            originLocale="en"
            target="Traducción"
            targetLocale="es"
            mode="new"
          />
        </p>

        <p>
          <Translation
            origin="Origin"
            originLocale="en"
            target="Traducción"
            targetLocale="es"
            mode="exam"
          />
        </p>
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
