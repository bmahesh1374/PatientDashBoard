import "./App.css";
import DashBoard from "./components/DashBoard.js";
import Navbar from "./components/Navbar.js";
import Sidebar from "./components/Sidebar.js";
import { useState } from "react";

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar setSelectedPatient={setSelectedPatient}/>
        <DashBoard selectedPatient={selectedPatient}/>
      </div>
    </>
  );
}

export default App;
