import React, { Component } from "react";
import fire from "./fire";
import QuizList from "./Components/QuizList";
import ShowQuiz from "./Components/ShowQuiz";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizName: "",
      showList: false,
      loaded: false,
      listData: [],
      listName: [],
      sendQuiz: "",
      sendSub: "",
      enableQuiz: false
    };
  }
  render() {
    let {
      loaded,
      showList,
      quizName,
      enableQuiz,
      sendQuiz,
      sendSub
    } = this.state;

    return (
      <div className="conatiner">
        {!loaded &&
          !showList &&
          !enableQuiz && <h3 className="display-4">Loading...</h3>}
        {loaded && !showList && !enableQuiz && this.renderList()}
        {loaded &&
          showList &&
          !enableQuiz && (
            <QuizList showQuiz={this.showQuiz} quizName={quizName} />
          )}
        {loaded &&
          !showList &&
          enableQuiz && <ShowQuiz sendQuiz={sendQuiz} sendSub={sendSub} />}
      </div>
    );
  }

  renderList = () => {
    const { listName } = this.state;
    return (
      <ol className="list-group">
        <h3 className="display-4">Loaded</h3>
        {listName.map((name, i) => {
          return (
            <li className="list-group-item" key={i}>
              <button
                onClick={() => this.subQuiz(i)}
                className="btn btn-primary mt-3"
              >
                {name}
              </button>
            </li>
          );
        })}
      </ol>
    );
  };

  showQuiz = (quizName, subName) => {
    let sendQuiz = quizName;
    let sendSub = subName;
    this.setState({
      sendQuiz,
      sendSub,
      enableQuiz: true,
      showList: false
    });
  };

  subQuiz = index => {
    const { listName } = this.state;
    this.setState({
      showList: true
    });
    let name = listName[index];
    this.setState({
      quizName: name
    });
    // console.log("clicked on", name);
  };

  componentWillMount() {
    const { listName } = this.state;
    let dataRef = fire.database().ref(`myQuizFolder`);
    dataRef.on("child_added", snapshot => {
      let name = snapshot.key;
      listName.push(name);
      this.setState({
        listName,
        loaded: true
      });
    });
  }
}

export default Quiz;
