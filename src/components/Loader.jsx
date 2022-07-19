import { Spinner, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const {  authenticated } = useSelector((state) => state.auth);
  const nav = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token == null){
      if (!authenticated) {
        nav("/SignIn");
      
    }
    }
      
  }, []);

  return (
    <Flex justifyContent="center" position="fixed" bg="#000" opacity="0.1" left="0" top="70" w="100%" h="100vh" alignItems="center">
      
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.800"
        size="xl"
      />
    </Flex>
  );
};

export default Loading;
