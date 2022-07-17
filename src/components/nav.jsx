import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Box,
  MenuButton,
  Button,
  Link,
  Icon,
  Text,
  HStack,
  useColorModeValue,
  useColorMode,
  useMediaQuery,
  Drawer,
} from "@chakra-ui/react";
import { BiMoon } from "react-icons/bi";
import { ImSun } from "react-icons/im";
import { GiHamburgerMenu, GiRamProfile } from "react-icons/gi";
import { FaUser, FaChevronDown, FaEdit, FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { setAuthenticated } from "../redux/features/Users/auth";
import { setDrawerState } from "../redux/features/Utils/utils";
import SidebarWrapper from "./SideBar";
import DrawerComponent from "./Drawer";

const NavComponent = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { toggleColorMode } = useColorMode();
  const [isLesserThan900] = useMediaQuery("(max-width: 900px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const iconColor = useColorModeValue("themeLight.icon", "themeLight.icon");
  const backgroundColor = useColorModeValue("themeLight.icon", "white.100");
  const shadow = useColorModeValue("#333", "#000");
  const icon = useColorModeValue(BiMoon, ImSun);
  const { authenticated } = useSelector((state) => state.auth);

  const SignOutHandler = () => {
    localStorage.clear();
    dispatch(setAuthenticated(false));
    nav("/SignIn");
  };

  return (
    <Flex
      p={{ base: "3", md: "5" }}
      h={{ base: "55px", md: "70px" }}
      bg={backgroundColor}
      justifyContent="space-between"
      boxShadow={`0px 0px 5px ${shadow}`}
      position="fixed"
      overflow="hidden"
      top="0"
      w="100%"
    >
      <Box>
        <Link display="flex" justifyContent="center" to="/" as={NavLink}>
          <svg
            width="40"
            height="36"
            viewBox="0 0 40 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 9.3913C0 4.20463 4.20463 0 9.3913 0H26.6087C31.7954 0 36 4.20463 36 9.3913V26.6087C36 31.7954 31.7954 36 26.6087 36H9.3913C4.20463 36 0 31.7954 0 26.6087V9.3913Z"
              fill="#440079"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.3387 27.7826H14.512V11.5517H8.21741V8.21738H14.5556V8.21737H27.7826V11.5517L24.6056 11.5517H18.3823V16.5946H26.202V19.6809H18.3823V27.7826L18.3387 27.7826Z"
              fill="white"
            />
          </svg>
          <Text
            fontSize={{ base: "20px", md: "25px", lg: "25px" }}
            fontWeight="600"
          >
            FinCash
          </Text>
        </Link>
      </Box>
      <Box>
        {isLargerThan900 && (
          <>
            {!authenticated ? (
              <HStack spacing="24px">
                <Link
                  fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                  _hover={{
                    transform: "scale(1.15)",
                    cursor: "pointer",
                    borderBottom: "2px",
                    borderBottomColor: "purple.600",
                    borderBottomRadius: "5px",
                  }}
                  fontWeight="600"
                  to={"/SignUp"}
                  as={NavLink}
                >
                  SignUp
                </Link>

                <Link
                  fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                  _hover={{
                    transform: "scale(1.15)",
                    cursor: "pointer",
                    borderBottom: "2px",
                    borderBottomColor: "purple.600",
                    borderBottomRadius: "5px",
                  }}
                  fontWeight="600"
                  to={"/SignIn"}
                  as={NavLink}
                >
                  SignIn
                </Link>

                <Icon
                  as={icon}
                  onClick={toggleColorMode}
                  mx={5}
                  w={{ base: "20px", md: "23px", lg: "27px" }}
                  h={{ base: "20px", md: "23px", lg: "27px" }}
                  color={iconColor}
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />
              </HStack>
            ) : (
              <HStack spacing="20px">
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<FaChevronDown />}
                    bg="inherit"
                  >
                    <Icon
                      as={FaUser}
                      w={{ base: "18px", md: "20px", lg: "22px" }}
                      h={{ base: "18px", md: "20px", lg: "22px" }}
                      mx={3}
                      _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      minH="48px"
                      bg="inherit"
                      onClick={() => nav("/Profile")}
                    >
                      <HStack justifyContent="space-between">
                        <Icon as={ImProfile} m="2" fontSize="20px" />
                        <Text m="2" textDecoration="none">
                          Profile
                        </Text>
                      </HStack>
                    </MenuItem>
                    <MenuItem minH="40px" onClick={() => SignOutHandler()}>
                      <HStack justifyContent="space-between">
                        <Icon as={FaSignOutAlt} m="2" fontSize="20px" />
                        <Text m="2" textDecoration="none">
                          Sign Out
                        </Text>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Icon
                  as={icon}
                  onClick={toggleColorMode}
                  mx={5}
                  w={{ base: "20px", md: "23px", lg: "27px" }}
                  h={{ base: "20px", md: "23px", lg: "27px" }}
                  color={iconColor}
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />
              </HStack>
            )}{" "}
          </>
        )}

        <>
          {isLesserThan900 && (
            <>
              {!authenticated ? (
                <HStack spacing="24px" p="2">
                  <Icon
                    as={icon}
                    onClick={toggleColorMode}
                    mx={5}
                    w={{ base: "20px", md: "23px", lg: "27px" }}
                    h={{ base: "20px", md: "23px", lg: "27px" }}
                    color={iconColor}
                    _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                  />
                  <Icon
                    as={GiHamburgerMenu}
                    id="hamburgerIcon"
                    ml={4}
                    _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                    onClick={() => dispatch(setDrawerState(true))}
                  />
                  <DrawerComponent />
                </HStack>
              ) : (
                <HStack spacing="15px">
                  <Icon
                    as={FaUser}
                    w={{ base: "18px", md: "20px", lg: "22px" }}
                    h={{ base: "18px", md: "20px", lg: "22px" }}
                    mx={3}
                    _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                  />
                  <Icon
                    as={icon}
                    onClick={toggleColorMode}
                    mx={5}
                    w={{ base: "20px", md: "23px", lg: "27px" }}
                    h={{ base: "20px", md: "23px", lg: "27px" }}
                    color={iconColor}
                    _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                  />
                  <Icon
                    as={GiHamburgerMenu}
                    id="hamburgerIcon"
                    ml={4}
                    _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                  />
                </HStack>
              )}
            </>
          )}
        </>
      </Box>
    </Flex>
  );
};

export default NavComponent;
