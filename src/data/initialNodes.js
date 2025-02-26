export const initialNodes = [
    {
      id: "1",
      type: "default",
      position: { x: 100, y: 100 },
      data: { label: "Project 0" },
    },
    {
      id: "2",
      type: "default",
      position: { x: 300, y: 100 },
      data: { label: "Middle Node" },
    },
  ];
  
  export const initialEdges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
  ];
  