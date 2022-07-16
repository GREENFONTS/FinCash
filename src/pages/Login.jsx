import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert";
import { UserLogin } from "../redux/features/Users/auth";
import {Box, Center, Image, Text, Icon, FormControl, Input, Button, VStack, useColorModeValue} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

const LoginPage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const textColor = useColorModeValue("black", "white");
  const { isLoading,error, token, user, authenticated, expiryDate, monoKey} = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(authenticated){
      localStorage.setItem('token', token)
      localStorage.setItem('tokenExpiryDate', expiryDate)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('monoKey', monoKey)
      nav("/dashboard")
    }
  })
  
  const submitHandler = (e) => {
    console.log("enetered")
    e.preventDefault();
    const formBody = {
      email,
      password,
    };

    dispatch(UserLogin(formBody))    
  };

  return (
    <Box mt={{md: "5"}}>
      <Center>
      <Box mt={{md: "5"}} p="3" align="center" w={{base:"100%", lg: "80%"}} h={{md: "65vh",lg:"75vh"}} display={{md: "flex"}}>
        <Box align="center" pt="7" w={{base:"90%", md:"50%"}} display={{base: "none", md: "block"}}  borderTopLeftRadius="80"  bg="purple.600" className="col-sm-12 col-lg-7">
            <Box mt="5" textColor="white" fontSize={{md: "23px", lg: "25px"}}>
            <Text> FinCash</Text>
            <h4>
              Track your payments
              <br />
              transactions with us and
              <br />
              enjoy other services <br />
              like buying data and airtime
            </h4>
            </Box>
          <Box mt="5">
          <Image w="80%" h="30vh" src="/images/bank image.jpg" alt="FinPic"/>
          </Box> 
        </Box>
  
       
        <Box p="5" w={{md:"50%", lg:"40%"}} align="center" aligItems="center" boxShadow={{md:"base"}}>
            <Box mb="5" mt="5" >
              <Icon fontSize={{base:"100px", md:"80px"}} as={FaUser}/>
            <Text fontSize="30px">LogIn to your account </Text>
            </Box>
            
            <Alert error={error} dispatch={dispatch}/>
            <VStack mt="5" spacing="25px">
            <FormControl>
              <Input
                type="email"
                size="lg"
                className="form-control"
                id="email"  
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl>
              <Input
                type="password"
                size="lg"
                className="form-control"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
              <Button bg="purple.600" w="100%" isLoading={isLoading} loadingText="logging in..." onClick={(e) => submitHandler(e)}>Login</Button>
            </VStack>
        </Box>
        </Box>
      </Center>
      
      </Box>
  );
};

export default LoginPage;
