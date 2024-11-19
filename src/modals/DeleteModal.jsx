import React from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteModal({ type, title, onDeleteBtnClick, setIsDeleteModalOpen }) {
  return (
    <Modal
      show={true}
      onHide={() => setIsDeleteModalOpen(false)}
      centered
      className="text-dark"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Delete this {type}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === "task" ? (
          <p>
            Are you sure you want to delete the <strong>"{title}"</strong> task
            and its subtasks? This action cannot be reversed.
          </p>
        ) : (
          <p>
            Are you sure you want to delete the <strong>"{title}"</strong>{" "}
            board? This action will remove all columns and tasks and cannot be
            reversed.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onDeleteBtnClick}>
          Delete
        </Button>
        <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
