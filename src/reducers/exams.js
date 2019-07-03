import { GET_EXAMS, SET_QST_MSG, SET_NEXT } from "../config";

//  setup for generic reducer configuration
export default function exams(
  state = {
    examData: []
  },
  action
) {
  switch (action.type) {
    case GET_EXAMS:
      return { ...state, examData: action.exam };
    case SET_NEXT:
      return { ...state, nextSet: action.data };
    case SET_QST_MSG:
      return {
        ...state,
        examData: action.data
      };
    default:
      return state;
  }
}
