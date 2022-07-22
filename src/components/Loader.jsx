import { Spinner, Box, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyToken } from "../redux/features/Users/auth";
import { dispatch } from "../redux/store";

const Loading = () => {
  const { authenticated, isLoading } = useSelector((state) => state.auth);
  const nav = useNavigate();
  let token = localStorage.getItem("token");
  const {pathname} = useLocation()

  useEffect(() => {
    if (
      !isLoading &&
      !authenticated &&
      (token === "null" || token === null || token === undefined)
    ) {
      localStorage.clear();
      nav("/SignIn");
    } else {
      dispatch(verifyToken(token))

    }
  }, []);

  useEffect(() => {

    if(authenticated){
      nav(pathname)
    }
  }, [authenticated])

  return (
    <>
      {isLoading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="9999999"
          bg="white"
          w="100%"
          h="100vh"
          opacity="0.999"
        >
          <Stack justifyContent="center" h="inherit" alignItems="center">
            <Spinner size="xl" color="primary-1" />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Loading;
