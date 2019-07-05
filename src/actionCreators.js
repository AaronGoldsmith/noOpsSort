// import axios from "axios";
import { SET_QST_MSG, BASE_API, axios_post, axios_get } from "./config";
const headers = { "content-type": "application/json" };
const API_BASE = "https://api.noopschallenge.com";




export function getExam(URL) {
  const PATH = `${API_BASE}${URL}`
  return dispatch => {
    axios_get(PATH, { headers })
      .then(response => {
        dispatch({
          type: SET_QST_MSG,
          data: response.data
        });
      })
      .catch(error => console.log(error));
  };
}
export function startExam(URL) {
  const body = { login: "AaronGoldsmith" };
  return dispatch => {
    axios_post(URL, body, { headers })
      .then(examData => {
        const nextSet = examData.data.nextSet;
        dispatch(getExam(nextSet));
      })
      .catch(error => console.warn("Error: could not connect to exams", error));
  };
}
// key = base
export function sendExam(URL, answers){
  const path = `${API_BASE}${URL}`
  const body = {solution: answers};
  return dispatch => {
    axios_post(path, body, {headers} )
    .then(response => {
      dispatch(getExam(response.data.nextSet));
    })
  }
}

