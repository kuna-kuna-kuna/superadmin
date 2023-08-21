import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MockData } from "./mockData";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./redux/slices/mainContext";
//pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FormDetails from "./pages/FormDetails";
//local storage
import localStorage from "redux-persist/es/storage";
import { LOCAL_STORAGE } from "./constants";

function App() {
  const authToken = useSelector((state) => state.main.authToken);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAuthTokenFromLocalStorage = async () => {
      const authToken = await localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN);
      dispatch(setAuthToken(authToken ? JSON.parse(authToken) : ""));
    };
    getAuthTokenFromLocalStorage();
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={authToken ? <Home /> : <Registration />} />
        <Route path={"/login"} element={<Login authToken={authToken} />} />
        <Route
          path="/form-details/:id"
          element={authToken ? <FormDetails data={MockData} /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
