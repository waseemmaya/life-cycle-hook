import React, { Component } from "react";
import fire from "../fire";
import swal from "sweetalert";

class ShowQuiz extends Component {
  state = {
    score: 0,
    result: [],
    allAns: [],
    loaded: false
  };
  render() {
    const { loaded } = this.state;
    return (
      <div className="container">
        {loaded && (
          <div>
            <h1>Panacloud Quiz App</h1>
            <form>{this.renderQuiz()}</form>
          </div>
        )}
        {!loaded && <h1>Loading</h1>}
      </div>
    );
  }

  renderQuiz = () => {
    let quiz = this.props.sendQuiz;
    const { result } = this.state;

    return (
      <div className="container">
        {result.map((val, i) => {
          return (
            <div key={quiz + "question" + i}>
              <h4 className="display-4">{val.question}</h4>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    onClick={e => this.handleCheck(e, i)}
                    type="radio"
                    className="form-check-input"
                    value={val.answers.ans1}
                    name={"q" + i}
                  />
                  <h6>{val.answers.ans1}</h6>
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    onClick={e => this.handleCheck(e, i)}
                    type="radio"
                    className="form-check-input"
                    value={val.answers.ans2}
                    name={"q" + i}
                  />
                  <h6>{val.answers.ans2}</h6>
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    onClick={e => this.handleCheck(e, i)}
                    type="radio"
                    className="form-check-input"
                    value={val.answers.ans3}
                    name={"q" + i}
                  />
                  <h6>{val.answers.ans3}</h6>
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    onClick={e => this.handleCheck(e, i)}
                    type="radio"
                    className="form-check-input"
                    value={val.answers.ans4}
                    name={"q" + i}
                  />
                  <h6>{val.answers.ans4}</h6>
                </label>
              </div>
            </div>
          );
        })}
        <input onClick={this.handleSubmit} type="submit" value="Submit" />
      </div>
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("didnt refresh");
    const { allAns } = this.state;
    var { score, result } = this.state;
    console.log("result", result);

    for (let i = 0; i < result.length; i++) {
      let correctAns = result[i].correctAns;
      console.log("correct", correctAns);
      if (allAns[i] === correctAns) {
        score++;
        this.setState({
          score
        });
      }
    }

    let final = `Your Score is ${score}/${result.length}`;
    swal(final);
    this.setState({
      score: 0
    });
  };

  handleCheck = (e, i) => {
    var { allAns } = this.state;
    let getVal = e.target.value;
    allAns[i] = getVal;
  };

  componentDidMount() {
    let quiz = this.props.sendQuiz;
    let subQuiz = this.props.sendSub;
    let { result } = this.state;
    let subRef = fire.database().ref(`myQuizFolder/${quiz}/${subQuiz}`);
    subRef.on("child_added", snapshot => {
      result.push(snapshot.val());
      this.setState({
        result,
        loaded: true
      });
    });
  }
}

export default ShowQuiz;
