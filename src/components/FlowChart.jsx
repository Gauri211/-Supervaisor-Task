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

// Define nodeTypes outside of the component
const nodeTypes = {
  customNode: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    data: { label: 'Project 0' },
    position: { x: 0, y: 0 },
    type: 'customNode',
  },
  {
    id: '2',
    data: { label: 'Planning' },
    position: { x: -500, y: 100 },
    type: 'customNode',
  },
  {
    id: '3',
    data: { label: 'Designing' },
    position: { x: -300, y: 100 },
    type: 'customNode',
  },
];

const initialEdges = [
  { id: '1-2', source: '1', target: '2', label: '1', type: 'step' },
  { id: '1-3', source: '1', target: '3', label: '2', type: 'step' },
];

function FlowChart() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [parentNodeId, setParentNodeId] = useState(null);  // To track the parent node for connection

  // Add a new node
  const addNode = () => {
    const newNodeId = String(nodes.length + 1);
    const newNode = {
      id: newNodeId,
      type: 'customNode',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${newNodeId}` },
    };

    // Add the new node to the state
    setNodes((prev) => [...prev, newNode]);

    // If there's a parent node selected, create an edge to it
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

  // Handle setting the parent node
  const selectParentNode = (nodeId) => {
    setParentNodeId(nodeId);
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
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // Handle deleting a node
  const deleteNode = (nodeId) => {
    setNodes((prev) => prev.filter((node) => node.id !== nodeId));
    setEdges((prev) => prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  // Update node label
  const updateNodeLabel = (id, label) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  };

  return (
    <div style={{ height: '100%' }}>
      <div style={{ padding: '10px', background: '#f4f4f4', height: '100px' }}>
        <button onClick={addNode}>Add Node</button>
        <button onClick={clearNodes}>Clear All</button>
        <div>
          <label>Select Parent Node: </label>
          <select onChange={(e) => selectParentNode(e.target.value)} value={parentNodeId || ''}>
            <option value="">None</option>
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.data.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes} // Pass nodeTypes here
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default FlowChart;
