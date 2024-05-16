import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Table from "./pages/Table";
import Update from "./pages/Update";
import Create from "./pages/Create";


function App() {
  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Table/>} />
      <Route path="/:id" element={<Update/>} />
      <Route path="/create" element={<Create/>} />
    </Routes>
    </Router>
  );
}

export default App;
