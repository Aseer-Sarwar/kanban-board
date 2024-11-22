import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditTaskModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import { Container, Row, Col, Button } from "react-bootstrap";
import AddEditTaskModal from "../modals/AddEditTaskModal";

function Home() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  console.log(isBoardModalOpen, "is board modal open");

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board ? board.columns : [];

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  async function postDragData(colData) {
    const respponse = await fetch("http://localhost:3000/dragData", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(colData),
    });
    const res = await respponse.json();
    console.log(res, "restaurantttttttttttttttttt");
  }

  return (
    <Container
      fluid
      className={`h-100 d-flex ${
        windowSize[0] >= 768 && isSideBarOpen ? "ml-md-4" : ""
      }  overflow-x-scroll`}
    >
      {/* Sidebar for Larger Screens */}
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Columns Section */}
      <Row className="flex-grow-1">
        <button onClick={postDragData(columns)} style={{ marginTop: 200 }}>
          post drag data
        </button>
        {columns.length > 0 ? (
          <>
            {columns.map((col, index) => (
              <Col key={index} xs={12} md={4} className="d-flex flex-column">
                <Column colIndex={index} />
              </Col>
            ))}
            {/* Add New Column */}
            {/* <Col
              xs={12}
              md={4}
              className="d-flex justify-content-center align-items-center text-muted bg-primary p-4 rounded"
              style={{ cursor: "pointer", border: "2px solid green" }}
              onClick={() => setIsBoardModalOpen(true)}
            >
              <Button
                variant="outline-primary"
                style={{ color: "whitesmoke" }}
                size="lg"
              >
                + New Column
              </Button>
            </Col> */}
          </>
        ) : (
          <EmptyBoard type="edit" />
        )}
      </Row>

      {/* Add/Edit Board Modal */}
      {/* {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )} */}
    </Container>
  );
}

export default Home;
