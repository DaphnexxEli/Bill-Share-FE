import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { Register } from "./pages/Register";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import { TwoOption } from "./pages/twoOption";


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/TwoOption" element={<TwoOption />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

