/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react';
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

  // History tracking for Undo/Redo
  const [history, setHistory] = useState([{ nodes: initialNodes, edges: initialEdges }]);
  const [currentStep, setCurrentStep] = useState(0);

  // Save the current state to history
  const saveHistory = (newNodes, newEdges) => {
    const updatedHistory = history.slice(0, currentStep + 1);
    setHistory([...updatedHistory, { nodes: newNodes, edges: newEdges }]);
    setCurrentStep(updatedHistory.length);
  };

  // Undo Action
  const undo = () => {
    if (currentStep > 0) {
      setNodes(history[currentStep - 1].nodes);
      setEdges(history[currentStep - 1].edges);
      setCurrentStep(currentStep - 1);
    }
  };

  // Redo Action
  const redo = () => {
    if (currentStep < history.length - 1) {
      setNodes(history[currentStep + 1].nodes);
      setEdges(history[currentStep + 1].edges);
      setCurrentStep(currentStep + 1);
    }
  };

  // Add a new node
  const addNode = () => {
    const newNodeId = String(nodes.length + 1);
    const newNode = {
      id: newNodeId,
      type: 'customNode',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${newNodeId}` },
    };

    const newNodes = [...nodes, newNode];
    let newEdges = [...edges];

    // Attach to parent if selected
    if (parentNodeId) {
      newEdges = [...newEdges, { id: `e${parentNodeId}-${newNodeId}`, source: parentNodeId, target: newNodeId, type: 'step' }];
    }

    setNodes(newNodes);
    setEdges(newEdges);
    saveHistory(newNodes, newEdges); 
  };

  // Clear all nodes and edges
  const clearNodes = () => {
    setNodes([]);
    setEdges([]);
    saveHistory([], []); 
  };

  // Delete an edge on double-click
  const onEdgeDoubleClick = (event, edge) => {
    event.stopPropagation();
    const newEdges = edges.filter((e) => e.id !== edge.id);
    setEdges(newEdges);
    saveHistory(nodes, newEdges); 
  };

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);
        saveHistory(updatedNodes, edges);
        return updatedNodes;
      });
    },
    [edges]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => {
        const updatedEdges = applyEdgeChanges(changes, eds);
        saveHistory(nodes, updatedEdges);
        return updatedEdges;
      });
    },
    [nodes]
  );

  const onConnect = useCallback((params) => {
    if (params.source === params.target) {
      console.log("Cannot connect node to itself.");
      return;
    }
    const newEdges = addEdge(params, edges);
    setEdges(newEdges);
    saveHistory(nodes, newEdges); 
  }, [nodes, edges]);

  return (
    <div style={{ height: '100%' }}>
      <div className="toolbar">
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

        <button onClick={addNode} className="btn add-btn">Add Node</button>
        <button onClick={clearNodes} className="btn clear-btn">Clear All</button>
        <button onClick={undo} className="btn undo-btn" disabled={currentStep === 0}>Undo</button>
        <button onClick={redo} className="btn redo-btn" disabled={currentStep >= history.length - 1}>Redo</button>
      </div>

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
