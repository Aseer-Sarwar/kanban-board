import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ElipsisMenu from "../components/ElipsisMenu";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import boardsSlice from "../redux/boardsSlice";
import Subtask from "../components/Subtask";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteModal from "./DeleteModal";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";

function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }) {
  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = () => {
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <Modal
        show={true}
        onHide={onClose}
        centered
        size="lg"
        className="text-dark"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{task.title}</Modal.Title>
          <img
            src={elipsis}
            alt="ellipsis"
            className="cursor-pointer ms-2"
            onClick={() => setIsElipsisMenuOpen((prev) => !prev)}
            style={{ height: "24px" }}
          />
          {isElipsisMenuOpen && (
            <Dropdown.Menu show align="end" className="position-absolute">
              <Dropdown.Item onClick={setOpenEditModal}>
                Edit Task
              </Dropdown.Item>
              <Dropdown.Item
                onClick={setOpenDeleteModal}
                className="text-danger"
              >
                Delete Task
              </Dropdown.Item>
            </Dropdown.Menu>
          )}
        </Modal.Header>

        <Modal.Body>
          <p className="text-muted">{task.description}</p>
          <h6 className="mt-4">
            Subtasks ({completed} of {subtasks.length})
          </h6>
          {subtasks.map((subtask, index) => (
            <Subtask
              index={index}
              taskIndex={taskIndex}
              colIndex={colIndex}
              key={index}
            />
          ))}

          <Form.Group className="mt-4">
            <Form.Label>Current Status</Form.Label>
            <Form.Select value={status} onChange={onChange}>
              {columns.map((col, index) => (
                <option key={index}>{col.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
        />
      )}

      {/* Add/Edit Task Modal */}
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </>
  );
}

export default TaskModal;
