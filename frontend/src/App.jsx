import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { JoinByCodeOrQRCode } from "./pages/joinPartypage";
import { CreateParty } from "./pages/createParty";
import { ResetPassword } from "./pages/Reset";
import { Data } from "./pages/AllData";
import { PartyPage } from "./pages/PartyPage";
import { NewMenu } from "./pages/AddMenu";
import Navbar from "./components/Navbar";
import "./App.css";
import EditMenuList from "./pages/editRestaurant";
import { NotFound } from "./pages/Notfound";
import { NetworkError } from "./pages/NetworkError";
import { SummarizeBill } from "./pages/Summarize";


function App() {
  return (
    <>
      <div className="flex justify-center">
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/createParty" element={<CreateParty />} />
            <Route path="/joinByCodeOrQRCode" element={<JoinByCodeOrQRCode />} />
            <Route path="/data" element={<Data />} />
            <Route path="/partyPage" element={<PartyPage />} />
            <Route path="/addMenu" element={<NewMenu />} />
            <Route path="/restaurant/:id" element={<EditMenuList />} />
            <Route path="/summarizeBill" element={<SummarizeBill />} />
            <Route path="/networkError" element={<NetworkError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
