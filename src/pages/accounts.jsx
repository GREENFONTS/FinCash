import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loader";
import { GetAccounts } from "../redux/features/Users/accounts";
import {setAuthenticated, setLoading, verifyToken, setState} from "../redux/features/Users/auth";

const Accounts = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(setLoading(true));
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (token === null || user === null) {
      dispatch(setLoading(false));
      dispatch(setAuthenticated(false));
    } else {
      user = JSON.parse(user);
      dispatch(setState({ token, user }));
      dispatch(verifyToken(token));
    }
    const {id} = user;
    const Data = {
        token, 
        id
    }
    dispatch(GetAccounts(Data))
  }, []);

  return <> {!user ? <Loading /> :
  <>Hello</>
}</>;
};

export default Accounts;
