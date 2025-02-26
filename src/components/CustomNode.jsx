/* eslint-disable react/prop-types */
import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

const CustomNode = ({ data, id }) => {
  const [label, setLabel] = useState(data.label || "Node");
  const { setNodes } = useReactFlow();

  // Handle label changes
  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setLabel(newLabel); 
    handleLabelChangeInState(newLabel); 
  };
  
  const handleLabelChangeInState = (label) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  };
  

  const handleDelete = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
  }

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "180px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        value={label}
        onChange={handleLabelChange}
        style={{ width: "100%", border: "none", textAlign: "center" }}
      />
      
      <button
        onClick={handleDelete} 
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

      <Handle type="target" position={Position.Top} style={{ borderRadius: "50%" }} />
      <Handle type="source" position={Position.Bottom} style={{ borderRadius: "50%" }} />
    </div>
  );
};

export default CustomNode;