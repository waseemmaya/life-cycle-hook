import React, { Component } from "react";
import fire from "../fire";

class RenderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: [],
      loaded: false
    };
  }
  render() {
    const { loaded } = this.state;
    return (
      <div>
        {!loaded && <h3 className="display-4">Loading...</h3>}
        {loaded && this.renderList()}
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
                onClick={() => this.props.subQuiz(i)}
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

  componentDidMount() {
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

export default RenderList;
