import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function EmptyBoard({ type }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white dark:bg-secondary">
      <h3 className="text-muted fw-bold text-center">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {/* <Button
        variant={type === "edit" ? "primary" : "success"}
        className="mt-4"
        onClick={() => setIsBoardModalOpen(true)}
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </Button>
      <Modal
        show={isBoardModalOpen}
        onHide={() => setIsBoardModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {type === "edit" ? "Add New Column" : "Add New Board"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddEditBoardModal
            type={type}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        </Modal.Body>
      </Modal> */}
    </div>
  );
}

export default EmptyBoard;
