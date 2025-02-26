export const initialNodes = [
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
    position: { x: -250, y: 100 },
    type: 'customNode',
  },
];

export const initialEdges = [
  { id: '1-2', source: '1', target: '2', type: 'step' },
  { id: '1-3', source: '1', target: '3', type: 'step' },
];