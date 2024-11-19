import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import useDarkMode from "../hooks/useDarkMode";
import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const boards = useSelector((state) => state.boards);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <>
      {/* Sidebar Content (All in the same column) */}
      <div
        className={`d-flex flex-column ${isSideBarOpen ? "d-block" : "d-none"}`}
        style={{ width: "300px", marginTop: 100 }}
      >
        {/* Sidebar Header (Boards List) */}
        <div className="px-3 py-2">
          <h5 className="dark:text-gray-300 text-gray-600">
            ALL BOARDS ({boards?.length})
          </h5>
        </div>

        {/* Board List (1 column for all boards) */}
        <div className="d-flex flex-column px-3 py-2">
          {boards.map((board, index) => (
            <div
              key={index}
              className={`d-flex align-items-center px-3 py-2 mb-2 rounded ${
                board.isActive ? "bg-primary text-white" : "text-muted"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() =>
                dispatch(boardsSlice.actions.setBoardActive({ index }))
              }
            >
              <img src="/icon-board.svg" alt="Board Icon" className="me-2" />
              <p className="mb-0 fw-bold">{board.name}</p>
            </div>
          ))}
        </div>

        {/* Add New Board Button */}
        <div
          className="d-flex align-items-center text-primary px-3 py-2 rounded mt-3"
          style={{ cursor: "pointer" }}
          onClick={() => setIsBoardModalOpen(true)}
        >
          <img src="/icon-board.svg" alt="Add Board Icon" className="me-2" />
          <p className="mb-0 fw-bold">+ Create New Board</p>
        </div>

        {/* Dark Mode Toggle */}
        <div className="d-flex align-items-center justify-content-between bg-light p-3 rounded mt-4">
          <img src="/icon-light-theme.svg" alt="Light Mode" />
          <Form.Check
            type="switch"
            id="dark-mode-switch"
            label=""
            checked={darkSide}
            onChange={(e) => toggleDarkMode(e.target.checked)}
            className={darkSide ? "bg-primary" : ""}
          />
          <img src="/icon-dark-theme.svg" alt="Dark Mode" />
        </div>
      </div>

      {/* Sidebar Toggle Button (Fixed at the bottom) */}
      <div
        className={`position-fixed ${
          isSideBarOpen ? "bottom-4 left-4" : "bottom-4 left-4"
        } z-index-10`}
        style={{
          zIndex: 1050,
          bottom: "180px", // Ensure it's always at the bottom
          left: "20px", // Position it to the left of the screen
        }}
      >
        {isSideBarOpen ? (
          <Button
            variant="outline-primary"
            className="d-flex align-items-center"
            onClick={toggleSidebar}
          >
            <img
              src="/icon-hide-sidebar.svg"
              alt="Hide Sidebar"
              className="me-2"
            />
            <span>Hide Sidebar</span>
          </Button>
        ) : (
          <Button
            variant="primary"
            className="rounded-circle"
            onClick={toggleSidebar}
          >
            <img src="/icon-show-sidebar.svg" alt="Show Sidebar" />
          </Button>
        )}
      </div>

      {/* Add/Edit Board Modal */}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </>
  );
}

export default Sidebar;
