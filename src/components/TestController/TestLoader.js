import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import "./exam.css";

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}
const DragItem = SortableElement(({ value, special }) => {
  return <li className={`dragItem ${special ? "drop" : ""}`}>{value}</li>;
});
const DragArea = SortableContainer(({ sortList }) => {
  return (
    <ul className="dragArea">
      {sortList.map((word, i) => (
        <DragItem key={`item-${i}`} index={i} value={word} />
      ))}
    </ul>
  );
});

class TestLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemList: [] };
  }
  handleSort = ({ oldIndex, newIndex }) => {
    const itemList = arrayMove(this.state.itemList, oldIndex, newIndex);
    this.setState({ itemList });
  };
  componentDidMount() {
    this.setState({ itemList: this.props.itemList });
  }

  render() {
    return (
      <DragArea
        sortList={this.state.itemList}
        axis={"x"}
        onSortEnd={this.handleSort}
      />
    );
  }
}
export default TestLoader;
