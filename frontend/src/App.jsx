import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { Register } from "./pages/Register";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

import { CardContainer } from "./pages/optionSelection";
import { JoinByCodeOrQRCode} from "./pages/joinPartypage";
import { CreateParty} from "./pages/createParty";
import { ResetPassword } from "./pages/Reset";
import { ForAdmin } from "./pages/AdminPage";
import { NewMenu } from "./pages/AddMenu";
import { Data } from "./pages/AllData";
import { PartyPage } from "./pages/PartyPage";



function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPassword  />} />
          <Route path="/cardcontainer" element={<CardContainer />} />
          <Route path="/createParty" element={<CreateParty />} /> 
          <Route path="/joinByCodeOrQRCode" element={<JoinByCodeOrQRCode />} /> 
          <Route path="/forAdmin" element={<ForAdmin />} /> 
          <Route path="/newMenu" element={<NewMenu />} /> 
          <Route path="/data" element={<Data />} /> 
          <Route path="/partyPage" element={<PartyPage />} /> 
        </Routes>
      </div>
    </>
  );
}

export default App;

