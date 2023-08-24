import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom"
import GitHubInstall from './component/GitHubInstall';
import UserType from './component/UserType';
import HostingOption from './component/HostingOption';
import DeploymentOption from './component/DeploymentOption';
import ShowRepo from './component/ShowRepo';
import SignUp from "./component/SignUp"
import Login from "./component/Login"

//import hooks
import { useDispatch ,useSelector} from "react-redux";
import { useEffect } from "react";
import { githubLoadUser, loadUser } from './redux/action/user';
import toast, { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const { error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(loadUser());
    dispatch(githubLoadUser())
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [dispatch, error, message]);

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserType />}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/github' element={<GitHubInstall/>} />
        <Route path='/hostingoption' element={<HostingOption />} />
        <Route path='/deployoption' element={<DeploymentOption />} />
        <Route path='/gitrepo' element={<ShowRepo />} />
        <Route path='/Signup' element={<SignUp />} />
      </Routes>
      <Toaster/>
    </BrowserRouter>  
  );
}

export default App;
