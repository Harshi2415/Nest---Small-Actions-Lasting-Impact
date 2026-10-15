import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoutes";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Posts from "./pages/Posts";
import Register from "./pages/Register"; 
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import TeamDetails from "./pages/TeamDetails";
import JoinTeam from "./pages/JoinTeam";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamId" element={<TeamDetails />} />
        <Route path="/teams/:id/join" element={<JoinTeam />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}