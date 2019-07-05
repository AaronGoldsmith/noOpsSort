import React from "react";
import { connect } from "react-redux";
import { API_START } from "../../config/";
import { startExam, sendExam } from "../../actionCreators";
import {TestLoader} from "./TestLoader";

import "./exam.css";
class TestController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      question: [],
      itemList: []
    };
    this.stopwatch = undefined;

  
  }

 handleUpdating = (question) => {
   this.setState({itemList: question})
  // this.props.updateOrder(answers);
 }

  componentDidMount() {
    this.props.startExam(API_START);
    
    this.stopWatch = setInterval(() => {
      if (this.state.time < 1000) {
        this.setState({ time: this.state.time + 1 });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.message !== prevProps.message) {
      this.setState({ message: this.props.message });
    }
    if (this.props.exam !== prevProps.exam) {
      this.handleUpdating(this.props.exam.question)
      let exam = {...this.props.exam}
      this.setState(exam);
    }
    if(this.state.itemList !== prevState.itemList){
      console.log('updated itemList: ', this.state.itemList)
    }
  }
  handleupdate = (itemList) => {
    console.log('handleUpdate', itemList);
    this.setState({itemList})
  }
  handleSubmit = () => {
      const {itemList, setPath} = this.state
      this.props.sendExam(setPath, itemList)
  }
  translateTime(time, minute, second){
    return time < 10
      ? `0:0${time}`
      : time < 60
      ? `0:${time}`
      : minute > 0 && second < 10
      ? `${minute}:0${second}`
      : `${minute}:${second}`;
  }

  render() {
    const { time,message,itemList } = this.state;
    const minute = Math.floor(time / 60);
    const second = time % 60;
    const transformNum = this.translateTime(time,minute, second);
    return (
      <div>
        {message && <div>{message}</div>}
        {itemList && <TestLoader itemList={itemList} updateOrder={this.handleupdate} />}
        <button type="submit" onClick={this.handleSubmit}>I'm done</button>
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
  { startExam, sendExam }
)(TestController);
