import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Nav from "./component/Nav";
import { useContext } from "react";
import { userDataContext } from "./pages/context/UserContext";

function App() {

  let {userData} = useContext(userDataContext)
   
  return (
    <>
   { userData  && <Nav/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App;
