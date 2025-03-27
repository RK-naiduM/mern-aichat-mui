import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PlatinumPage from "./pages/PlatinumPage";
import GoldPage from "./pages/GoldPage";
import SilverPage from "./pages/SilverPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Now Login.js is the homepage */}
        <Route path="/register" element={<Register />} />
        <Route path="/platinum" element={<PlatinumPage />} />
        <Route path="/gold" element={<GoldPage />} />
        <Route path="/silver" element={<SilverPage />} />
      </Routes>
    </Router>
  );
}

export default App;
