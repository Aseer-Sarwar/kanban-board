import React, { useState } from "react";
import { Navbar, Nav, Button, Dropdown, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import ElipsisMenu from "./ElipsisMenu";
import boardsSlice from "../redux/boardsSlice";

const Header = ({ setIsBoardModalOpen, isBoardModalOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  console.log(isElipsisMenuOpen, "isElipseMenu");

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      className="p-3 fixed-top d-flex align-items-center justify-content-between"
    >
      {/* Left Side */}
      <div className="d-flex align-items-center">
        <img
          src="/logo-mobile.svg"
          alt="Logo"
          className="me-2"
          style={{ height: "24px", width: "24px" }}
        />
        <h3 className="d-none d-md-inline-block fw-bold mb-0">Kanban</h3>
        <div className="d-flex align-items-center ms-4">
          <h3
            className="text-truncate mb-0 fw-bold"
            style={{ maxWidth: "300px" }}
          >
            {board.name}
          </h3>
          <img
            src={
              openDropdown ? "/icon-chevron-up.svg" : "/icon-chevron-down.svg"
            }
            alt="dropdown icon"
            className="ms-2 d-md-none"
            style={{ cursor: "pointer", width: "12px" }}
            onClick={() => setOpenDropdown(!openDropdown)}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="d-flex align-items-center">
        <Button
          variant="primary"
          className="d-none d-md-inline-block"
          onClick={() => setIsTaskModalOpen((prevState) => !prevState)}
          style={{ marginRight: 20 }}
        >
          + Add New Task
        </Button>
        <Button
          variant="primary"
          className="d-md-none"
          onClick={() => setIsTaskModalOpen((prevState) => !prevState)}
        >
          +
        </Button>
        <img
          src="/icon-vertical-ellipsis (1).svg"
          alt="ellipsis menu"
          style={{ cursor: "pointer", height: "24px" }}
          onClick={() => {
            setBoardType("edit");
            // setOpenDropdown(false);
            setIsElipsisMenuOpen((prevState) => !prevState);
          }}
        />
        {isElipsisMenuOpen && (
          <ElipsisMenu
            type="Boards"
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        )}
      </div>

      {/* Dropdown */}
      {openDropdown && (
        <HeaderDropDown
          setOpenDropdown={setOpenDropdown}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {/* Task Modal */}
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}
      {/* <Modal
        show={isTaskModalOpen}
        onHide={() => setIsTaskModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddEditTaskModal
            setIsAddTaskModalOpen={setIsTaskModalOpen}
            type="add"
            device="mobile"
          />
        </Modal.Body>
      </Modal> */}

      {/* Board Modal */}
      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {/* <Modal
        show={isBoardModalOpen}
        onHide={() => setIsBoardModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {boardType === "edit" ? "Edit Board" : "Add New Board"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddEditBoardModal
            setBoardType={setBoardType}
            type={boardType}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        </Modal.Body>
      </Modal> */}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </Navbar>
  );
};

export default Header;
