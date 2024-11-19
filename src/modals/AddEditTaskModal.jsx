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
  task,
}) {
  const dispatch = useDispatch();
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  // const [subtasks, setSubtasks] = useState([
  //   { title: "", isCompleted: false, id: uuidv4() },
  //   { title: "", isCompleted: false, id: uuidv4() },
  // ]);
  const [title, setTitle] = useState(type === "edit" ? task.title : "");
  const [description, setDescription] = useState(
    type === "edit" ? task.description : ""
  );
  const [subtasks, setSubtasks] = useState(
    type === "edit"
      ? task.subtasks.map((subtask) => ({
          ...subtask,
          id: subtask.id || uuidv4(), // Ensure each subtask has a unique ID
        }))
      : [{ title: "", isCompleted: false, id: uuidv4() }]
  );

  const board = useSelector((state) => state.boards.find((b) => b.isActive));
  console.log(board, "board from add/edit task modal");
  const columns = board?.columns || [];
  console.log(columns, "columns from add/edit task modal");
  // const [status, setStatus] = useState(columns[prevColIndex]?.name || "");
  const [status, setStatus] = useState(
    type === "edit" ? task.status : columns[prevColIndex]?.name || ""
  );

  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const validate = () => {
    if (!title.trim()) return false;
    if (subtasks.some((subtask) => !subtask.title.trim())) return false;
    setIsValid(true);
    return true;
  };

  const handleSubtaskChange = (id, value) => {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.id === id ? { ...subtask, title: value } : subtask
      )
    );
  };

  const handleSubmit = () => {
    if (!validate()) return;
    console.log(
      title,
      description,
      subtasks,
      status,
      taskIndex,
      prevColIndex,
      newColIndex
    );

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

    setIsAddTaskModalOpen(false);
    if (type === "edit") setIsTaskModalOpen(false);
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
          <Form.Group className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Take coffee break"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="e.g. It's always good to take a break..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Label>Subtasks</Form.Label>
          {subtasks.map((subtask) => (
            <div key={subtask.id} className="d-flex align-items-center mb-3">
              <Form.Control
                type="text"
                value={subtask.title}
                onChange={(e) =>
                  handleSubtaskChange(subtask.id, e.target.value)
                }
                placeholder="Subtask title"
              />
              <Button
                variant="danger"
                className="ms-2"
                onClick={() =>
                  setSubtasks((prev) =>
                    prev.filter((st) => st.id !== subtask.id)
                  )
                }
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() =>
              setSubtasks((prev) => [
                ...prev,
                { title: "", isCompleted: false, id: uuidv4() },
              ])
            }
          >
            + Add Subtask
          </Button>
          <Form.Group className="mt-3">
            <Form.Label>Current Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setNewColIndex(e.target.selectedIndex);
              }}
            >
              {columns.map((col, idx) => (
                <option key={idx} value={col.name}>
                  {col.name}
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
        <Button variant="primary" onClick={handleSubmit}>
          {type === "edit" ? "Save Changes" : "Create Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEditTaskModal;
