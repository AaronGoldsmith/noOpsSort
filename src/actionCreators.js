import axios from "axios";
import { GET_WORDS, SET_QST_MSG, ax_post, BASE_API } from "./config";
const headers = { "content-type": "application/json" };
const API_START = "https://api.noopschallenge.com/sortbot/exam/start";

export function getExam(URL) {
  return dispatch => {
    axios
      .get(URL, { headers })
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
    ax_post(URL, body, { headers })
      .then(examData => {
        const nextSet = examData.data.nextSet;
        const URL = `${BASE_API}${nextSet}`;
        dispatch(getExam(URL));
      })
      .catch(error => console.log("Error: could not connect to exams"));
  };
}

// return dispatch({
//   type: GET_EXAMS,
//   exam: examData.data.nextSet
// });
