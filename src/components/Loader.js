import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth from "../redux/features/Users/auth";

const Loading = () => {
  const { isLoading, authenticated } = useSelector((state) => state.auth);
  const nav = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(authenticated, token)
    if (token == null){
      if (!authenticated) {
        nav("/SignIn");
      }
    }
     
    else{
      if (!authenticated) {
        nav("/SignIn");
      }
    }
  });

  return (
    <div>
      Loading.. <Spinner />
      </div>
  );
};

export default Loading;
