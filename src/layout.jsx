import { useSelector } from "react-redux";
import NavComponent from "./components/nav";
import LeftSidebarWrapper from "./components/LeftSideBar";
import { Flex, Box} from "@chakra-ui/react";
import RightSidebarWrapper from "./components/RigthSideBar";
import Loading from "./components/Loader";

const Layout = ({ children }) => {
  const { authenticated, isLoading } = useSelector((state) => state.auth);
  return (
    <>
     
      <Loading />
      <Flex>
        
          {authenticated ?
        <>
            <Box
              w="20%"
              h="100%"
              position="fixed"
              z-index="1"
              overflowX="hidden"
            >
              <LeftSidebarWrapper />
            </Box>
            <Box w={"65%"} ml={"20%"} mr={"17%"}>
              {children}
            </Box>
         
            <Box
              w="17%"
              h="100%"
              position="fixed"
              right="0"
              z-index="1"
              overflowX="hidden"
            >
              <RightSidebarWrapper />
            </Box>

          </> : <Loading />}
        
      </Flex>
    </>
  );
};

export default Layout;
