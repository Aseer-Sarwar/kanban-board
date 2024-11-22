import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { ThemeContext } from "../App";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  const boards = useSelector((state) => state.boards);

  return (
    <>
      {/* Sidebar Container */}
      <div className={`sidebar ${theme}`}>
        <div
          className={`d-flex flex-column ${
            isSideBarOpen ? "d-block" : "d-none"
          }`}
          style={{
            width: "300px",
            marginTop: "100px",
          }}
        >
          {/* Sidebar Header */}
          <div className="px-3 py-2">
            <h5>ALL BOARDS ({boards?.length})</h5>
          </div>

          {/* Board List */}
          <div className="d-flex flex-column px-3 py-2">
            {boards.map((board, index) => (
              <div
                key={index}
                className={`d-flex align-items-center px-3 py-2 mb-2 rounded ${
                  board.isActive
                    ? "bg-primary"
                    : theme
                    ? "text-light"
                    : "text-muted"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch(boardsSlice.actions.setBoardActive({ index }))
                }
              >
                <img src="/icon-board.svg" alt="Board Icon" className="me-2" />
                <p
                  className={`mb-0  fw-bold ${
                    theme === "light" ? "text-dark" : "text-light"
                  } `}
                >
                  {board.name}
                </p>
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
          <div>
            <img src="/icon-light-theme.svg" alt="Light Mode" />
            <Form.Check
              type="switch"
              id="theme-switch"
              label={
                theme === "light"
                  ? "Switch to Dark Mode"
                  : "Switch to Light Mode"
              }
              onChange={toggleTheme}
              checked={theme === "dark"}
            />

            <img src="/icon-dark-theme.svg" alt="Dark Mode" />
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        <div
          className="position-fixed"
          style={{
            zIndex: 1050,
            bottom: "180px",
            left: "20px",
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
      </div>
    </>
  );
}

export default Sidebar;
