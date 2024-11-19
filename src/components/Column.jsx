import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";
import { Badge } from "react-bootstrap"; // Import Badge from React Bootstrap

function Column({ colIndex }) {
  const colors = [
    "danger", // red
    "warning", // orange
    "primary", // blue
    "secondary", // gray
    "success", // green
    "info", // teal
    "light", // light gray
    "dark", // dark gray
    "pink", // custom color
  ];

  const dispatch = useDispatch();
  const [color, setColor] = useState(null);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

  useEffect(() => {
    const randomColor = shuffle(colors).pop();
    if (randomColor) {
      setColor(randomColor);
    }
    console.log("Color set to:", randomColor); // Log to ensure color is set correctly
  }, [dispatch]);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
      style={{ marginTop: 200 }}
    >
      <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        {/* Use React Bootstrap's Badge component to create the circle */}
        <Badge
          pill
          variant={color || "light"}
          style={{ width: "20px", height: "20px", display: "inline-block" }}
        />
        {col.name} ({col.tasks.length})
      </p>

      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
