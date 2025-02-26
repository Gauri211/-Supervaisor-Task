import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from "./CustomNode";
import { initialNodes, initialEdges } from "../data/initialNodes";

const nodeTypes = {
  customNode: CustomNode,
};

function FlowChart() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [parentNodeId, setParentNodeId] = useState(null);
  
  // Undo/Redo State
  const [history, setHistory] = useState([{ nodes: initialNodes, edges: initialEdges }]);
  const [currentStep, setCurrentStep] = useState(0);

  // Save history on every change
  useEffect(() => {
    if (currentStep < history.length - 1) {
      setHistory(history.slice(0, currentStep + 1));
    }
    setHistory([...history, { nodes, edges }]);
    setCurrentStep((prev) => prev + 1);
  }, [nodes, edges]);

  // Undo Function
  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setNodes(history[currentStep - 1].nodes);
      setEdges(history[currentStep - 1].edges);
    }
  };

  // Redo Function
  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setNodes(history[currentStep + 1].nodes);
      setEdges(history[currentStep + 1].edges);
    }
  };

  // Add a new node
  const addNode = () => {
    const newNodeId = String(nodes.length + 1);
    const newNode = {
      id: newNodeId,
      type: 'customNode',
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: `Node ${newNodeId}` },
    };

    setNodes((prev) => [...prev, newNode]);

    if (parentNodeId) {
      setEdges((prev) => [
        ...prev,
        { id: `e${parentNodeId}-${newNodeId}`, source: parentNodeId, target: newNodeId, type: 'step' },
      ]);
    }
  };

  // Clear all nodes and edges
  const clearNodes = () => {
    setNodes([]);
    setEdges([]);
  };

  // Delete an edge on double-click
  const onEdgeDoubleClick = (event, edge) => {
    event.stopPropagation();
    handleEdgeDelete(edge.id);
  };

  const handleEdgeDelete = (edgeId) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId));
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback((params) => {
    if (params.source === params.target) {
      console.log("Cannot connect node to itself.");
      return; 
    }
    setEdges((eds) => addEdge(params, eds));
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <div className="toolbar">
        {/* Select Parent Node */}
        <div className="toolbar-group">
          <label>Select Parent Node</label>
          <select onChange={(e) => setParentNodeId(e.target.value)} value={parentNodeId || ''}>
            <option value="">None</option>
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.data.label}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <button onClick={addNode} className="btn add-btn">Add Node</button>
        <button onClick={clearNodes} className="btn clear-btn">Clear All</button>
        <button onClick={undo} className="btn undo-btn" disabled={currentStep === 0}>Undo</button>
        <button onClick={redo} className="btn redo-btn" disabled={currentStep >= history.length - 1}>Redo</button>
      </div>

      {/* Flowchart */}
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onEdgeDoubleClick={onEdgeDoubleClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default FlowChart;
