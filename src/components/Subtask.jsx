import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import { Form, ListGroup } from "react-bootstrap";

function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtask = task.subtasks.find((subtask, i) => i === index);
  console.log(subtask, "subTask");
  const checked = subtask.isCompleted;

  const onChange = () => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <ListGroup.Item
      className={`d-flex align-items-center gap-3 p-3 ${
        checked ? "text-muted text-decoration-line-through" : ""
      }`}
      action
    >
      <Form.Check
        type="checkbox"
        className="cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
      <span>{subtask.title}</span>
    </ListGroup.Item>
  );
}

export default Subtask;
