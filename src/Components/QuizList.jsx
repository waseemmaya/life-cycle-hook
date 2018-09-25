import React, { Component } from "react";
import fire from "../fire";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subList: [],
      loaded: false
    };
  }
  render() {
    const { loaded } = this.state;
    return (
      <div>
        {!loaded && <h3 className="display-3">Loading...</h3>}
        {loaded && this.renderSubList()}
      </div>
    );
  }

  renderSubList = () => {
    const { subList } = this.state;
    return (
      <ol className="list-group">
        {subList.map((val, i) => {
          return (
            <li className="list-group-item" key={i}>
              <button
                onClick={() => this.renderQuiz(i)}
                className="btn btn-primary mt-3"
              >
                {val}
              </button>
            </li>
          );
        })}
      </ol>
    );
  };

  renderQuiz = i => {
    const { quizName } = this.props;
    const { subList } = this.state;
    let subName = subList[i];
    this.props.showQuiz(quizName, subName);
  };

  componentWillMount() {
    const { quizName } = this.props;
    let { subList } = this.state;

    let subRef = fire.database().ref(`myQuizFolder/${quizName}`);
    subRef.on("value", snapshot => {
      snapshot.forEach(val => {
        subList.push(val.key);
        this.setState({
          subList,
          loaded: true
        });
      });
    });
  }
}

export default Quiz;
