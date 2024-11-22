import React, { useState } from "react";
import { Navbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import ElipsisMenu from "./ElipsisMenu";
import boardsSlice from "../redux/boardsSlice";

const Header = ({ setIsBoardModalOpen, isBoardModalOpen }) => {
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

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
    <Navbar className="p-3 fixed-top d-flex align-items-center justify-content-between">
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
            {board?.name || "No Active Board"}
          </h3>
        </div>
      </div>

      {/* Right Side */}
      <div className="d-flex align-items-center position-relative">
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
          onClick={() => setIsElipsisMenuOpen((prevState) => !prevState)}
        />
        {isElipsisMenuOpen && (
          <ElipsisMenu
            type="Boards"
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        )}
      </div>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {/* Board Modal */}
      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board?.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </Navbar>
  );
};

export default Header;
