import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/notes/noteState";
import Aleart from "./component/Aleart";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState("null");

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  return (
    <>
      <NoteState>
        <Router>
          <div>
            <Navbar />
            <Aleart alert = {alert} />
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />

              <Route exact path="/about" element={<About />} />

              <Route exact path="/login" element={<Login showAlert={showAlert} />} />

              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
