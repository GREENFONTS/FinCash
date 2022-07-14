import { useSelector } from "react-redux";
import App from "./App";
import NavComponent from "./components/nav";
import SidebarWrapper from "./components/SideBar";
import { Flex, Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <>
      <NavComponent />
      <Flex>
        {authenticated && (
          <Box w="20%">
            <SidebarWrapper />
          </Box>
        )}

        <Box w={authenticated ? "80%" : "100%"}>{children}</Box>
      </Flex>
    </>
  );
};

export default Layout;
