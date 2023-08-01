import "./App.css";
import Contact from "./components/contact/Contact";
import { UseGlobalContext } from "./components/context/Context";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import DeleteAccount from "./components/pages/setting/DeleteAccount";
import Setting from "./components/pages/setting/Setting";
import Single from "./components/pages/single/Single";
import Write from "./components/pages/write/Write";
import SIngleComments from "./components/post/SIngleComments";
import PrivateComponent from "./components/privatecomponent/PrivateComponent";
import Profile from "./components/profile/Profile";
import Topbar from "./components/topbar/Topbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const redirectHandler = (link) =>{
    window.open(link,'_blank');
  }
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/update" element={<Setting />} />
          <Route path="/delete" element={<DeleteAccount/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/contact" element={<Contact redirectHandler={redirectHandler} />} />
          <Route path="/post/:postId" element={<Single />} />
          <Route path="/comment/:postId" element={<SIngleComments/>} />
        </Route>
        <Route path="/register" element={ <Register />} />
        <Route path="/login" element={<Login />}/>  
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
