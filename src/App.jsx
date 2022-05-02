import FrontPage from "./components/voting/Routes/FrontPage";
import AddBill from "./components/voting/Routes/AddBill";
import InfoPage from "./components/voting/Routes/InfoPage";
import Register from "./components/voting/Routes/Register";
import Results from "./components/voting/Routes/Results";
import Voting from "./components/voting/Routes/Voting";
import MainContent from "./components/voting/MainContent";
import StartVote from "./components/voting/Routes/StartVote";
import {
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <div className="bg-[#E5E5E5] h-screen">
       <Routes>
          <Route path="/" element={<FrontPage /> } />

          <Route path="/welcome/home" element={<FrontPage /> } />
          <Route path="/welcome/startVote" element={<StartVote /> } />
          <Route path="/welcome/info" element={<InfoPage /> } />
          <Route path="/welcome/addBill" element={<AddBill />} />
          <Route path="/welcome/register" element={<Register />} />
          <Route path="/welcome/results" element={<Results />} />
          <Route path="/welcome/vote" element={<Voting />} />
      </Routes>
     
    </div>
  );
}
