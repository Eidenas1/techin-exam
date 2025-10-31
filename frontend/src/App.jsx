import "./App.css";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import MainPage from "./pages/MainPage/MainPage";
import { Routes, Route } from "react-router";
import ProtectRoute from "../src/utils/protectRoute"
import AdminPanel from './pages/AdminPanel/AdminPanel'
function App() {
  return (
      <Routes>
       <Route path="/" element={<MainPage/>}/>
       <Route path="/:id" element={<DetailsPage/>}/>
       <Route
          path="/admin"
          element={
            <ProtectRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectRoute>
          }
        />
      </Routes>
  );
}

export default App;
