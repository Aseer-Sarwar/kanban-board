import React from "react";
import { Dropdown } from "react-bootstrap"; // Import Dropdown from react-bootstrap

function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    <div
      className={
        type === "Boards"
          ? "position-absolute top-16 end-0"
          : "position-absolute top-6 end-0"
      }
    >
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="link"
          id="dropdown-custom-components"
          className="p-0 text-muted"
        >
          <i className="bi bi-three-dots-vertical"></i>{" "}
          {/* Optional, add an icon */}
        </Dropdown.Toggle>

        <Dropdown.Menu className="bg-white shadow-lg rounded-lg p-2">
          <Dropdown.Item
            as="button"
            onClick={() => setOpenEditModal()}
            className="text-dark"
          >
            Edit {type}
          </Dropdown.Item>

          <Dropdown.Item
            as="button"
            onClick={() => setOpenDeleteModal()}
            className="text-danger"
          >
            Delete {type}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ElipsisMenu;
