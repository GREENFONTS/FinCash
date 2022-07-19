import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Icon,
  Text,
  HStack,
  useColorModeValue,
  Container,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { MdPayments } from "react-icons/md";

const LeftSidebarWrapper = () => {
  const nav = useNavigate();
  const backgroundColor = useColorModeValue("purple.800", "purple.900");
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  return (
    <Container bg={backgroundColor} h="100vh" p="0" m="0">
      <Box textColor="white" mb="2" p="4">
        <Text
          align="center"
          fontSize="23px"
          fontWeight="600"
          fontFamily="cursive"
        >
          Welcome, {user ? user.userName : ""} <br />
          😊
        </Text>
      </Box>

      <Divider orientation="horizontal" w="100%" />
      <VStack display="block" pt="5" spacing="30px">
        <HStack
          onClick={() => nav("/dashboard")}
          textColor="white"
          borderLeft={pathname === "/dashboard" ? "2px solid white" : "none"}
          _hover={{cursor: "pointer"}}
        >
          <Box m="3" >
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.08348 0.899994C2.43223 0.899994 1.80765 1.17392 1.34715 1.66152C0.886639 2.14911 0.62793 2.81043 0.62793 3.49999V6.09999C0.62793 6.78956 0.886639 7.45088 1.34715 7.93847C1.80765 8.42607 2.43223 8.69999 3.08348 8.69999H5.53904C6.19029 8.69999 6.81487 8.42607 7.27538 7.93847C7.73589 7.45088 7.9946 6.78956 7.9946 6.09999V3.49999C7.9946 2.81043 7.73589 2.14911 7.27538 1.66152C6.81487 1.17392 6.19029 0.899994 5.53904 0.899994H3.08348ZM3.08348 11.3C2.43223 11.3 1.80765 11.5739 1.34715 12.0615C0.886639 12.5491 0.62793 13.2104 0.62793 13.9V16.5C0.62793 17.1896 0.886639 17.8509 1.34715 18.3385C1.80765 18.8261 2.43223 19.1 3.08348 19.1H5.53904C6.19029 19.1 6.81487 18.8261 7.27538 18.3385C7.73589 17.8509 7.9946 17.1896 7.9946 16.5V13.9C7.9946 13.2104 7.73589 12.5491 7.27538 12.0615C6.81487 11.5739 6.19029 11.3 5.53904 11.3H3.08348ZM10.4502 3.49999C10.4502 2.81043 10.7089 2.14911 11.1694 1.66152C11.6299 1.17392 12.2545 0.899994 12.9057 0.899994H15.3613C16.0125 0.899994 16.6371 1.17392 17.0976 1.66152C17.5581 2.14911 17.8168 2.81043 17.8168 3.49999V6.09999C17.8168 6.78956 17.5581 7.45088 17.0976 7.93847C16.6371 8.42607 16.0125 8.69999 15.3613 8.69999H12.9057C12.2545 8.69999 11.6299 8.42607 11.1694 7.93847C10.7089 7.45088 10.4502 6.78956 10.4502 6.09999V3.49999ZM10.4502 13.9C10.4502 13.2104 10.7089 12.5491 11.1694 12.0615C11.6299 11.5739 12.2545 11.3 12.9057 11.3H15.3613C16.0125 11.3 16.6371 11.5739 17.0976 12.0615C17.5581 12.5491 17.8168 13.2104 17.8168 13.9V16.5C17.8168 17.1896 17.5581 17.8509 17.0976 18.3385C16.6371 18.8261 16.0125 19.1 15.3613 19.1H12.9057C12.2545 19.1 11.6299 18.8261 11.1694 18.3385C10.7089 17.8509 10.4502 17.1896 10.4502 16.5V13.9Z"
                fill="currentColor"
              />
            </svg>
          </Box>

          <Text m="3" fontSize="23px" textDecoration="none">
            Overview
          </Text>
        </HStack>

        <HStack
          onClick={() => nav("/dashboard/accounts")}
          textColor="white"
          borderLeft={
            pathname === "/dashboard/accounts" ? "2px solid white" : "none"
          }
          _hover={{cursor: "pointer"}}
        >
          <Box m="3" >
            
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 0V1.8H13.5V5.4H18V7.2H13.5C12.501 7.2 11.7 6.399 11.7 5.4V4.5H7.2V13.5H11.7V12.6C11.7 11.601 12.501 10.8 13.5 10.8H18V12.6H13.5V16.2H18V18H13.5C12.501 18 11.7 17.199 11.7 16.2V15.3H7.2C6.201 15.3 5.4 14.499 5.4 13.5V9.9H0V8.1H5.4V4.5C5.4 3.501 6.201 2.7 7.2 2.7H11.7V1.8C11.7 0.801 12.501 0 13.5 0H18Z"
                fill="currentColor"
              />
            </svg>
          </Box>

          <Text m="3" fontSize="23px" textDecoration="none">
            Accounts
          </Text>
        </HStack>

        <HStack
          onClick={() => nav("/dashboard/statistics")}
          textColor="white"
          borderLeft={
            pathname === "/dashboard/statistics" ? "2px solid white" : "none"
          }
          _hover={{cursor: "pointer"}}
        >
          <Box m="3">
            <svg
               width="23"
               height="23"
               viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 5.76199V13.762V5.76199ZM9 8.76199V13.762V8.76199ZM5 11.762V13.762V11.762ZM3 17.762H15C15.5304 17.762 16.0391 17.5513 16.4142 17.1762C16.7893 16.8011 17 16.2924 17 15.762V3.76199C17 3.23156 16.7893 2.72285 16.4142 2.34778C16.0391 1.97271 15.5304 1.76199 15 1.76199H3C2.46957 1.76199 1.96086 1.97271 1.58579 2.34778C1.21071 2.72285 1 3.23156 1 3.76199V15.762C1 16.2924 1.21071 16.8011 1.58579 17.1762C1.96086 17.5513 2.46957 17.762 3 17.762Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>

          <Text m="3" fontSize="23px" textDecoration="none">
            Statistics
          </Text>
        </HStack>

        <HStack
         _hover={{cursor: "pointer"}}
          onClick={() => nav("/dashboard/billPayments")}
          textColor="white"
          borderLeft={
            pathname === "/dashboard/billPayments" ? "2px solid white" : "none"
          }
        >
          <Icon as={MdPayments} m="3" fontSize="23px" />

          <Text m="3" fontSize="23px" textDecoration="none">
            Bill Payments
          </Text>
        </HStack>
      </VStack>
    </Container>
  );
};

export default LeftSidebarWrapper;
