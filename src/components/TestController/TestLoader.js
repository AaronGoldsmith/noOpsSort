import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import "./exam.css";

const DragItem = SortableElement(({ value, special }) =>
{
  return <li className={`dragItem ${special ? "drop" : ""}`}>{value}</li>
});

const DragArea = SortableContainer(({ sortList }) =>
{
  return (
    <ul className="dragArea">
      {sortList && sortList.map((word, i) => (
        <DragItem key={`item-${i}`} index={i} value={word} />
      ))}
    </ul>
  );
});

function arrayMove(arr, from, to)
{
  let array = arr.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

export const TestLoader = ({ itemList, updateOrder }) =>
{
  let list = [...itemList]

  const handleSort = (({ oldIndex, newIndex }) =>
  {
    const itemList = arrayMove(list, oldIndex, newIndex);
    updateOrder(itemList);
  })

  return (
    <DragArea
      sortList={itemList}
      distance={0}
      axis={"x"}
      onSortEnd={handleSort}
    />
  );
  // }
}
