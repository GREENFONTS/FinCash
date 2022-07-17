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
          <Box w="20%" h="100%" mt="70px" position="fixed" z-index="1" overflowX="hidden">
            <SidebarWrapper />
          </Box>
        )}

        <Box w={authenticated ? "80%" : "100%"} mt="70px" ml="20%">{children}</Box>
      </Flex>
    </>
  );
};

export default Layout;
