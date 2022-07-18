import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Home from "./Screen/Home";
import Test from "./Screen/Test";
import Fortest from "./Screen/Fortest";
import Testfor from "./Screen/Testfor";
import PaidUserPage from "./Screen/Paid/paid";
import NotPaidUserPage from "./Screen/Not_Paid/Not_Paid";
import Sidebar from "./Components/Sidebar";
import "./App.css";
import { useEffect, useState } from "react";

import User from "./Screen/User/User";
import Qabul from "./Screen/Qabul/Qabul";
import UserForAdmin from "./Screen/UserForAdmin/UserForAdmin";
import QrPage from "./Components/PDF/QrPage";
import PaySlip from "./Components/tickedDownload/container";
import SingleUser from "./Screen/SingleUser/SingleUser";
import Statistics from "./Screen/Statistics/Statistics";
import RequireAuth from "./utils/PrivateRoute";
import Login from "./utils/Login";
import {getCookie} from "./utils/cookie";

function App() {
  const [language, setLanguage] = useState(
    Number(localStorage.getItem("language"))
  );
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(undefined);
  const [login, setlogin] = useState(!!getCookie("jwt_token"));

  const [users, setUsers] = useState([]);
  // const fakeUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const MainApi = "http://185.217.131.79/api/";
  const fetchData = async () => {
    const request = await fetch(MainApi);
    const response = await request.json();
    setUsers(response);
  };

  useEffect(() => {
    fetchData();
  }, [users]);
  const { setapp } = useParams();
  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "0");
    }
  }, []);

  useEffect(() => {
    setLanguage(Number(localStorage.getItem("language")));
  }, [localStorage.getItem("language")]);

  return (
    <Router>
      <Routes>
        <Route path="/QR/:id/:setapp" element={<QrPage />} />
        <Route
          path="/"
          element={
            <>
              <Sidebar
                setapp={setapp}
                setLanguage={setLanguage}
                language={language}
                userName={userName}
                setUserName={setUserName}
              />
              <Home language={language} setUserName={setUserName} />
            </>
          }
        />
        <Route
          path="/ariza"
          element={<Test language={language} setUserName={setUserName} />}
        />
        <Route path="/testfor" element={<Testfor />} />
        <Route
          path="/user_for_admin/:id"
          element={<UserForAdmin language={language} />}
        />
        <Route
          path="/user"
          element={<SingleUser setUserName={setUserName} language={language} id={id}/>}
        />
        <Route path="/qabul" element={<RequireAuth access={login}><Qabul /></RequireAuth>} />
        <Route path="/paid" element={<PaidUserPage />} />
        <Route path="/notpaid" element={<NotPaidUserPage />} />
        <Route path="/pay-slip" element={<PaySlip />} />
        <Route
          path="/fortest"
          element={<Fortest setUserName={setUserName} language={language} setId={setId}/>}
        />
        <Route
          path="/statistics"
          element={<Statistics/>}
        />
        <Route
          path="/login"
          element={<Login setLogin={setlogin}/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
