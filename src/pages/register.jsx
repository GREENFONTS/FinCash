import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserRegister } from "../redux/features/Users/auth";
import Alert from "../components/Alert";
import {Box, Center, Image, Text, Icon, FormControl, Input, Button, VStack, useColorModeValue, FormLabel, FormHelperText} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const {isLoading, error} = useSelector(state => state.auth)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkPasswordLength, setCheckPasswordLength] = useState(false);

  useEffect(() => {
    if (password.length > 3 && password.length < 8) {
      setCheckPasswordLength(true);
    }  
    else setCheckPasswordLength(false);
    
  }, [password]);

  useEffect(() => {
    if(password !== password2){
        setCheckPassword(true)
    }
    else setCheckPassword(false)
  }, [password2]);

  const formBody = {
    username,
    email,
    password,
    Id: "",
    firstName: "",
    lastName: "",
    isEmailVerified: false,
  };

  const submitHandler = async (e) => {
    console.log("enetered")
    e.preventDefault()
    console.log(formBody);

    dispatch(UserRegister(formBody));
    
  };

  return (
    <Box mt={{md: "5"}}>
    <Center>
    <Box mt={{md: "5"}} p="3" align="center" w={{base:"100%", lg: "80%"}} h={{md: "75vh"}} display={{md: "flex"}}>
      <Box align="center" pt="7" w={{base:"90%", md:"50%"}} display={{base: "none", md: "block"}}  borderTopLeftRadius="80"  bg="purple.600" className="col-sm-12 col-lg-7">
          <Box mt="5" textColor="white" fontSize={{md: "23px", lg: "25px"}}>
            <h1> FinCash</h1>
            <p>
              Track your payments
              <br />
              transactions with us and
              <br />
              enjoy other services <br />
              like buying data and airtime
            </p>
            </Box>
          <Box mt="5">
          <Image w="80%" h="30vh" src="/images/bank image.jpg" alt="FinPic"/>
          </Box> 
        </Box>
        <Box p="5" w={{md:"50%", lg:"40%"}} align="center" aligItems="center" boxShadow={{md:"base"}}>
          <form onSubmit={(e) => submitHandler(e)}>
            <Box  mt="3" >
              <Icon fontSize={{base:"100px", md:"65px"}} as={FaUser}/>
            <Text fontSize="30px">SignUp an account </Text>
            </Box>
            
            <Alert error={error} dispatch={dispatch}/>
            <VStack mt="3" spacing={{base:"15px", md:"10px"}}>
            <FormControl>
              <Input
                type="text"
                id="username"
                required={true}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </FormControl>
            <FormControl>
              <Input
                type="email"
                size="md"
                id="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl>
              <Input
                type="password"
                id="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
              />
               {checkPasswordLength && (
              <FormHelperText color={"red.200"} textAlign="left">
                Password is less than 8 characters
              </FormHelperText>
            )}
            </FormControl>
           
            <FormControl>
              <Input
                type="password"
                id="password2"
                required={true}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm your password"
              />
              {checkPassword && (
                <FormHelperText color={"red.200"} textAlign="left">Password doesn't Match</FormHelperText>
              )}
            </FormControl>

            <Button bg="purple.600" w="100%" isLoading={isLoading} loadingText="logging in..." onClick={(e) => submitHandler(e)}>Login</Button>

            </VStack>
          </form>
        
      </Box>
      </Box>
      </Center>
    </Box>
  );
};

export default Register;
