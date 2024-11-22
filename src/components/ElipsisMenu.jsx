import React from "react";

function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    <div
      className="position-absolute bg-white shadow-lg rounded-lg p-2"
      style={{ top: "40px", right: "10px", zIndex: 10 }}
    >
      <button
        onClick={setOpenEditModal}
        className="btn btn-link text-dark d-block text-start"
      >
        Edit {type}
      </button>
      <button
        onClick={setOpenDeleteModal}
        className="btn btn-link text-danger d-block text-start"
      >
        Delete {type}
      </button>
    </div>
  );
}

export default ElipsisMenu;
