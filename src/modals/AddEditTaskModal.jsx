import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Modal, Form, Button } from "react-bootstrap";
import boardsSlice from "../redux/boardsSlice";

function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <Modal
      show={true}
      onHide={() => setIsAddTaskModalOpen(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{type === "edit" ? "Edit" : "Add New"} Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Task Name */}
          <Form.Group className="mb-3" controlId="task-name-input">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Take coffee break"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3" controlId="task-description-input">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="e.g. It's always good to take a break..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* Subtasks */}
          <Form.Label>Subtasks</Form.Label>
          {subtasks.map((subtask, index) => (
            <div key={index} className="d-flex align-items-center mb-3">
              <Form.Control
                type="text"
                placeholder="e.g. Take coffee break"
                value={subtask.title}
                onChange={(e) => onChangeSubtasks(subtask.id, e.target.value)}
                className="me-2"
              />
              <Button
                variant="danger"
                onClick={() => onDelete(subtask.id)}
                className="px-3"
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            variant="outline-primary"
            onClick={() =>
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ])
            }
            className="w-100 mb-3"
          >
            + Add New Subtask
          </Button>

          {/* Current Status */}
          <Form.Group controlId="select-status">
            <Form.Label>Current Status</Form.Label>
            <Form.Select value={status} onChange={onChangeStatus}>
              {columns.map((column, index) => (
                <option key={index} value={column.name}>
                  {column.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsAddTaskModalOpen(false)}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            const isValid = validate();
            if (isValid) {
              onSubmit(type);
              setIsAddTaskModalOpen(false);
              if (type === "edit") setIsTaskModalOpen(false);
            }
          }}
        >
          {type === "edit" ? "Save Changes" : "Create Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEditTaskModal;
