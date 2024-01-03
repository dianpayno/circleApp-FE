import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Details from "./page/Details";
import Login from "./page/Login";
import useLogin from "./Hooks/useLogin";
import { useEffect } from "react";
import Register from "./page/Register";

import Follows from "./page/Follows";
import HomeLayout from "./Layout/HomeLayout/HomeLayout";
import Search from "./page/Search";
import Profile from "./page/Profile";

import PrivateRoute from "./libs/PrivateRoute";
import { useLocation} from "react-router-dom";
import VisitOtherProfile from "./page/VisitOtherProfile";



function App() {
  const {pathname} = useLocation();
 
 useEffect(() => {
   if (pathname === "/") {
     document.title = "Cirlcle App | Home";
   }
   else if (pathname === "/login") {
    document.title = "Cirlcle App | Login";
  }else if (pathname === "/register") {
    document.title = "Cirlcle App | Register";
  } 
  else if (pathname.startsWith(`/details-post/`)) {
    document.title = "Cirlcle App | Detail Thread";
  } else if (pathname === `/profile`) {
    document.title = "Cirlcle App | Profile";
  }
 },[pathname])


 
  const { saveDataUser } = useLogin();
  useEffect(() => {
    saveDataUser();
  }, []);

  return (
    <Routes>
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
      <Route path="/" element={<HomeLayout/>} >
      <Route index element={<Home/>} />
      <Route path="/details-post/:id" element={<Details/>} />
      <Route path="/profiles/:id" element={<VisitOtherProfile/>} />
      <Route path="/follows" element={<Follows/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/profile" element={<Profile/>} />
      </Route>
      
      </Route>
     

      </>
    </Routes>
  );
}

export default App;
