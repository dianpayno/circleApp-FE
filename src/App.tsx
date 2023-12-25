import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Details from "./page/Details";
import Login from "./page/Login";
import useLogin from "./Hooks/useLogin";
import {useEffect} from 'react'
import Register from "./page/Register"






function App() {

const {saveDataUser} = useLogin()
useEffect(()=>{
  saveDataUser()
},[])

  return (
    <Routes>
      
          <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/details-post/:id" element={<Details />} />
        </>
      
    </Routes>
  );
}

export default App;
