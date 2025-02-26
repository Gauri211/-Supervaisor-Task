# 🚀 Interactive Flowchart Application (Supervaisor AI Task)

This is an **interactive flowchart application** built using **React Flow.**

---

## ⚙️ Features
✔ **Create nodes dynamically**  
✔ **Interactive flowchart with drag-and-drop**  
✔ **Parent-child relationships for nodes**  
✔ **Undo/Redo functionality for changes**  
✔ **Delete all or any particular node**  
✔ **Delete edges with a doubleclick**  

---

## 📥 Installation & Setup

1️⃣ Clone the Repository
```sh
git clone https://github.com/Gauri211/-Supervaisor-Task.git
cd Supervaisor-Task
```
2️⃣ Install Dependencies
```sh
npm install
```

3️⃣ Start the Development Server
```sh
npm run dev
```
This will start the app at http://localhost:5173/. 🎉

## 🛠️ JSON Data Structure
```json
{
  "nodes": [
    {
      "id": "1",
      "type": "customNode",
      "position": { "x": 100, "y": 100 },
      "data": { "label": "Start Node" }
    },
    {
      "id": "2",
      "type": "customNode",
      "position": { "x": 300, "y": 100 },
      "data": { "label": "Next Step" }
    }
  ],
  "edges": [
    { "id": "e1-2", "source": "1", "target": "2", "animated": true }
  ]
}

```
