import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  verifyToken,
  setLoading,
  setAuthenticated,
  setState
} from "../redux/features/Users/auth";
import {Lay} from "@chakra-ui/react";
import Loading from "../components/Loader";
import SidebarWrapper from "../components/SideBar";

const Dashboard = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    let expiryDate = localStorage.getItem("tokenExpiryDate");
    if (token === null || user === null) {
      dispatch(setLoading(false));
      dispatch(setAuthenticated(false));
    } else {
      var currentTime = new Date().getTime()
      var tokenTime = new Date(expiryDate).getTime()
      if(currentTime > tokenTime){
        dispatch(setAuthenticated(false))
      }
      user = JSON.parse(user)
      dispatch(setState({token, user, expiryDate}))
      dispatch(verifyToken(token));
    }
  }, []);



  return (
    <>
    {!user ? <Loading /> :
      <>Hello</>
  }</>
    
  );
};

export default Dashboard;
