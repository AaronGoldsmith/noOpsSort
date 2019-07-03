import React from "react";
import { connect } from "react-redux";
import { API_START, BASE_API } from "../../config/";
import { startExam } from "../../actionCreators";

import "./exam.css";

class TestController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorList: [],
      colorsPicked: [],
      time: 0
    };
    this.stopwatch = undefined;
  }

  componentDidMount() {
    this.props.startExam(API_START);
    this.stopWatch = setInterval(() => {
      if (this.state.time < 100) {
        this.setState({ time: this.state.time + 1 });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.message !== prevProps.message) {
      this.setState({ message: this.props.message });
    }
    if (this.props.exam !== prevProps.exam) {
      console.log(this.props.exam);
      this.setState(this.props.exam);
    }
  }

  render() {
    const { message, question, time } = this.state;
    let transformNum =
      time < 10
        ? `0:0${time}`
        : time < 60
        ? `0:${time}`
        : `${60 / time}:${60 % time}`;
    return (
      <div>
        {message && <div>{message}</div>}
        {question && (
          <ul>
            {question.map((num, i) => {
              return <li key={i}>{num}</li>;
            })}
          </ul>
        )}
        <button type="submit">I'm done</button>
        <p>{transformNum}</p>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    exam: state.exams.examData
  };
}
export default connect(
  mapStateToProps,
  { startExam }
)(TestController);
