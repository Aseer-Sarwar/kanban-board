import React, { useState } from "react";
import { useSelector } from "react-redux";
// import TaskModal from "../modals/TaskModal";
import { Card } from "react-bootstrap";
import TaskModal from "../modals/TaskModal";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board?.columns || [];
  const col = columns.find((_, i) => i === colIndex);
  const task = col?.tasks.find((_, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  const subtasks = task?.subtasks || [];
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      {/* Task Card */}
      <Card
        onClick={() => setIsTaskModalOpen(true)}
        draggable
        onDragStart={handleOnDrag}
        className="mb-3 shadow-sm cursor-pointer"
        style={{ width: "280px", cursor: "pointer", border: "2px solid red" }}
      >
        <Card.Body className="p-3 bg-white text-dark dark:bg-secondary dark:text-light">
          <Card.Title className="h6 fw-bold">{task?.title}</Card.Title>
          <Card.Text className="text-muted small mt-2">
            {completed} of {subtasks.length} completed tasks
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
