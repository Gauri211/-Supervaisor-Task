import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ data, id, selected, deleteNode, updateNodeLabel }) => {
  const [label, setLabel] = useState(data.label || "Node");

  // Handle label changes
  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    updateNodeLabel(id, e.target.value);
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxShadow: selected ? "0px 0px 10px rgba(0, 0, 0, 0.1)" : "none",
        width: "180px",
        textAlign: "center",
      }}
    >
      {/* Editable label */}
      <input
        type="text"
        value={label}
        onChange={handleLabelChange}
        style={{ width: "100%", border: "none", textAlign: "center" }}
      />
      
      {/* Delete Cross Icon */}
      <button
        onClick={() => deleteNode(id)} // Now the deleteNode function works
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "transparent",
          border: "none",
          color: "red",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ✖
      </button>

      {/* Node Handles */}
      <Handle type="target" position={Position.Top} style={{ borderRadius: "50%" }} />
      <Handle type="source" position={Position.Bottom} style={{ borderRadius: "50%" }} />
    </div>
  );
};

export default CustomNode;
