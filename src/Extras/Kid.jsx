import React, { Component } from "react";
import "../App.css";

class Kid extends Component {
  static defaultProps = {
    dressColor: "red",
    applaud: false,
    furtherSteps: []
  };
  constructor(props) {
    super(props);
    this.state = {
      emotion: "nervous",
      danceSteps: [],
      startedPerforming: true,
      volume : null
    };
  }

  qualified() {
    this.setState({ startedPerforming: false });
  }

componentWillMount() {
    this.setState({
        volume : 5
    })
}

componentDidMount(){
    const {danceSteps} = this.state;
    danceSteps.push('step 1');
    this.setState({
        danceSteps
    })
    console.log(this.state.danceSteps);
    
}

  render() {
    const { dressColor } = this.props;
    const { danceSteps, emotion, startedPerforming } = this.state;
    let currentStepIndex = 0;

    return (
      <div className="App">
        <div>dressColor: {dressColor}</div>

        <div style={{ backgroundColor: dressColor, width: 50, height: 50 }} />
        <div>Emotion: {emotion}</div>

        {startedPerforming && (
          <div>
            {" "}
            Current Step: {danceSteps[currentStepIndex]}
            <button
              onClick={() => {
                ++currentStepIndex;
                console.log("currentStepIndex", currentStepIndex);
              }}
            >
              Perform Next Step
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Kid;
