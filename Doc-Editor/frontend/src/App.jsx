
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import TextEditor from "./TextEditor";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to a new document with a unique ID */}
        <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} />
        
        {/* Route for opening a specific document */}
        <Route path="/documents/:id" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

export default App;

