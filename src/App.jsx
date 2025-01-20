import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
  const loginToken = window.localStorage.getItem("authToken");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={loginToken ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
