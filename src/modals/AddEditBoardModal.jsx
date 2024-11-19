import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
// import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import { v4 as uuidv4 } from "uuid";

function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <Modal
      show={true}
      onHide={() => setIsBoardModalOpen(false)}
      centered
      size="lg"
      className="dark:bg-[#2b2c37] text-black dark:text-white font-bold"
    >
      <Modal.Header closeButton>
        <Modal.Title>{type === "edit" ? "Edit" : "Add New"} Board</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Board Name */}
        <Form.Group className="mb-4">
          <Form.Label>Board Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!isValid && !name.trim()}
          />
        </Form.Group>

        {/* Board Columns */}
        <Form.Label>Board Columns</Form.Label>
        {newColumns.map((column, index) => (
          <div key={index} className="d-flex mb-3">
            <Form.Control
              className="mr-2"
              type="text"
              placeholder={`Column ${index + 1}`}
              value={column.name}
              onChange={(e) => onChange(column.id, e.target.value)}
              isInvalid={!isValid && !column.name.trim()}
            />
            <Button
              variant="danger"
              onClick={() => onDelete(column.id)}
              className="p-0"
            >
              <img src="/icon-cross.svg" alt="Delete" width="16" height="16" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline-primary"
          onClick={() =>
            setNewColumns([
              ...newColumns,
              { name: "", tasks: [], id: uuidv4() },
            ])
          }
          className="w-100 mb-4"
        >
          + Add New Column
        </Button>

        {/* Submit Button */}
        <Button
          variant="primary"
          onClick={() => {
            const isValid = validate();
            if (isValid === true) onSubmit(type);
          }}
          className="w-100"
        >
          {type === "add" ? "Create New Board" : "Save Changes"}
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default AddEditBoardModal;
