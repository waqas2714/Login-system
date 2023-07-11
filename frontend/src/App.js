import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
