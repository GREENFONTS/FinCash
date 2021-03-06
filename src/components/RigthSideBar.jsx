import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  HStack,
  Container,
  Divider,
  VStack,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { DatedTransactions, TransAmount } from "../Utils/Transactions";
import {
  GetAccountIdentity,
  setfilteredTransactions,
  setfilteredTransAmount,
  setTime,
} from "../redux/features/Users/accounts";
import { useLocation } from "react-router-dom";
import DashboardAlert from "./DashboardAlert";
import { UpdateUser } from "../redux/features/Users/auth";

const RightSidebarWrapper = () => {
  const dispatch = useDispatch();
  const { onClose } = useDisclosure();
  const { pathname } = useLocation();
  const {
    Transactions,
    time,
    filteredTransactions,
    creditAmount,
    debitAmount,
    currentAccount,
    currentAccountInfo,
    currentAccountIdentity,
    accounts,
  } = useSelector((state) => state.accounts);
  const { user, isLoading } = useSelector((state) => state.auth);
  const [modalState, setModalState] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (Transactions) {
      let { totalCredit, totalDebit } = TransAmount(Transactions);
      dispatch(setfilteredTransAmount({ totalCredit, totalDebit }));
    }
    if (user != null) {
      const { id } = user;
      if (accounts != null) {
        if (accounts.length != 0) {
          dispatch(GetAccountIdentity(id));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (accounts != null) {
      if (accounts.length != 0) {
        if (time != null) {
          if (Transactions) {
            let filteredTrans = DatedTransactions(Transactions, time);

            dispatch(setfilteredTransactions(filteredTrans));
          }
        }
      }
    }
  }, [time]);

  useEffect(() => {
    if (accounts != null) {
      if (accounts.length != 0) {
        if (filteredTransactions) {
          let { totalCredit, totalDebit } = TransAmount(filteredTransactions);

          dispatch(setfilteredTransAmount({ totalCredit, totalDebit }));
        }
      }
    }
  }, [filteredTransactions]);

  const UpdateUserHandler = (e) => {
    e.preventDefault();
    const formBody = {
      userName,
      email: user.email,
      password: user.password,
      Id: user.id,
      firstName,
      lastName,
      isEmailVerified: user.isEmailVerified,
    };

    dispatch(UpdateUser(formBody))
    setModalState(false)
  };

  return (
    <Container bg={"white"} h="100vh" p="0" m="0">
      {pathname == "/dashboard/accounts" ? (
        <>
          <Box p="3">
            <Text
              align="center"
              fontSize="23px"
              fontWeight="600"
              fontFamily="cursive"
            >
              {currentAccount != null ? currentAccount.branchName : ""}
            </Text>
          </Box>
          <Divider orientation="horizontal" w="100%" />
          <VStack alignItems="flex-start" pl="3" pt="1" spacing="15px">
            <Box>
              <Text fontWeight="700" fontSize="15px">
                BranchID
              </Text>
              <Text color="gray" fontSize="13px">
                #{currentAccount != null ? currentAccount.branchId : ""}
              </Text>
            </Box>

            <Box>
              <Text fontWeight="700" fontSize="15px">
                Branch Address
              </Text>
              <Text color="gray">
                {currentAccount != null ? currentAccount.address : ""}
              </Text>
            </Box>

            <Box>
              <Text fontWeight="700" fontSize="15px">
                Branch Description
              </Text>
              <Text color="gray">
                {currentAccount != null ? currentAccount.description : ""}
              </Text>
            </Box>

            <Box>
              <Text fontWeight="700" fontSize="15px">
                Branch Account Number
              </Text>
              <Text color="gray">
                {currentAccountInfo != null
                  ? currentAccountInfo.accountNumber
                  : ""}
              </Text>
            </Box>

            <Box>
              <Text fontWeight="700" fontSize="15px">
                Branch Account Type
              </Text>
              <Text color="gray">
                {currentAccountInfo != null ? currentAccountInfo.type : ""}
              </Text>
            </Box>
          </VStack>

          <Box p="4">
            <HStack>
              <Text w="60%" fontWeight="700" fontSize="18px">
                Recent Activity
              </Text>

              <Select
                w="40%"
                placeholder="Select range"
                onChange={(e) => dispatch(setTime(e.target.value))}
              >
                <option value="1day">1day</option>
                <option value="7days">7days</option>
                <option value="1month">1month</option>
                <option value="3months">3months</option>
                <option value="6months">6months</option>
                <option value="1year">1year</option>
              </Select>
            </HStack>
          </Box>

          <Box pl="3">
            <VStack alignItems="flex-start" spacing="5px">
              <HStack>
                <Box>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#F3E4FF" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 13C12 12.4696 12.2107 11.9609 12.5858 11.5858C12.9609 11.2107 13.4696 11 14 11C14 11.7956 14.3161 12.5587 14.8787 13.1213C15.4413 13.6839 16.2044 14 17 14H19C19.7956 14 20.5587 13.6839 21.1213 13.1213C21.6839 12.5587 22 11.7956 22 11C22.5304 11 23.0391 11.2107 23.4142 11.5858C23.7893 11.9609 24 12.4696 24 13V24C24 24.5304 23.7893 25.0391 23.4142 25.4142C23.0391 25.7893 22.5304 26 22 26H14C13.4696 26 12.9609 25.7893 12.5858 25.4142C12.2107 25.0391 12 24.5304 12 24V13ZM15 17C14.7348 17 14.4804 17.1054 14.2929 17.2929C14.1054 17.4804 14 17.7348 14 18C14 18.2652 14.1054 18.5196 14.2929 18.7071C14.4804 18.8946 14.7348 19 15 19H15.01C15.2752 19 15.5296 18.8946 15.7171 18.7071C15.9046 18.5196 16.01 18.2652 16.01 18C16.01 17.7348 15.9046 17.4804 15.7171 17.2929C15.5296 17.1054 15.2752 17 15.01 17H15ZM18 17C17.7348 17 17.4804 17.1054 17.2929 17.2929C17.1054 17.4804 17 17.7348 17 18C17 18.2652 17.1054 18.5196 17.2929 18.7071C17.4804 18.8946 17.7348 19 18 19H21C21.2652 19 21.5196 18.8946 21.7071 18.7071C21.8946 18.5196 22 18.2652 22 18C22 17.7348 21.8946 17.4804 21.7071 17.2929C21.5196 17.1054 21.2652 17 21 17H18ZM15 21C14.7348 21 14.4804 21.1054 14.2929 21.2929C14.1054 21.4804 14 21.7348 14 22C14 22.2652 14.1054 22.5196 14.2929 22.7071C14.4804 22.8946 14.7348 23 15 23H15.01C15.2752 23 15.5296 22.8946 15.7171 22.7071C15.9046 22.5196 16.01 22.2652 16.01 22C16.01 21.7348 15.9046 21.4804 15.7171 21.2929C15.5296 21.1054 15.2752 21 15.01 21H15ZM18 21C17.7348 21 17.4804 21.1054 17.2929 21.2929C17.1054 21.4804 17 21.7348 17 22C17 22.2652 17.1054 22.5196 17.2929 22.7071C17.4804 22.8946 17.7348 23 18 23H21C21.2652 23 21.5196 22.8946 21.7071 22.7071C21.8946 22.5196 22 22.2652 22 22C22 21.7348 21.8946 21.4804 21.7071 21.2929C21.5196 21.1054 21.2652 21 21 21H18Z"
                      fill="#8F00FF"
                    />
                  </svg>
                </Box>

                <VStack alignItems="flex-start" spacing="1px">
                  <Text fontWeight="500">Total Transactions</Text>
                  <Text color="gray" fontSize="13px">
                    {Transactions != null ? Transactions.length : ""}
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <Box>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#FFD4D4" />
                    <path
                      d="M22.1667 14.6667V24.6667M10.5 11.3333H21.3333H10.5ZM10.5 14.6667H18H10.5ZM10.5 18H15.5H10.5ZM18.8333 18L22.1667 14.6667L18.8333 18ZM22.1667 14.6667L25.5 18L22.1667 14.6667Z"
                      stroke="#FF0000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>

                <VStack alignItems="flex-start" spacing="3px">
                  <Text fontWeight="500">Debit</Text>
                  <Text color="gray" fontSize="13px">
                    N{debitAmount}
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <Box>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#D4FFDA" />
                    <path
                      d="M22.1667 14.6667V24.6667M10.5 11.3333H21.3333H10.5ZM10.5 14.6667H18H10.5ZM10.5 18H15.5H10.5ZM18.8333 18L22.1667 14.6667L18.8333 18ZM22.1667 14.6667L25.5 18L22.1667 14.6667Z"
                      stroke="#008E13"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>

                <VStack alignItems="flex-start" spacing="3px">
                  <Text fontWeight="500">Credit</Text>
                  <Text color="gray" fontSize="13px">
                    N{creditAmount}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </>
      ) : (
        <>
          <Box p="3">
            <Text
              align="center"
              fontSize="23px"
              fontWeight="600"
              fontFamily="cursive"
            >
              Profile
            </Text>
          </Box>
          <Divider orientation="horizontal" w="100%" />
          <VStack alignItems="flex-start" pl="3" pt="4" spacing="20px">
            <Box>
              <Text fontWeight="700" fontSize="15px">
                FullName
              </Text>
              <Text color="gray" fontSize="13px">
                {currentAccountIdentity != null
                  ? currentAccountIdentity.fullName
                  : user.firstName + " " + user.lastName}
              </Text>
            </Box>

            <Box>
              <Text fontWeight="700" fontSize="15px">
                Gender
              </Text>
              <Text color="gray" fontSize="13px">
                {currentAccountIdentity != null
                  ? currentAccountIdentity.gender
                  : ""}
              </Text>
            </Box>

            <Box>
              <Text fontWeight="700" fontSize="15px">
                BVN
              </Text>
              <Text color="gray" fontSize="13px">
                {currentAccountIdentity != null
                  ? currentAccountIdentity.bvn
                  : ""}
              </Text>
            </Box>
          </VStack>
          <Box pl="3" pt="3">
            <VStack alignItems="flex-start" spacing="15px">
              <HStack>
                <Box>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#FFE4C2" />
                    <path
                      d="M25.2 14.5L18 18.875L10.8 14.5V12.75L18 17.125L25.2 12.75V14.5ZM25.2 11H10.8C9.801 11 9 11.7788 9 12.75V23.25C9 23.7141 9.18964 24.1592 9.52721 24.4874C9.86477 24.8156 10.3226 25 10.8 25H25.2C25.6774 25 26.1352 24.8156 26.4728 24.4874C26.8104 24.1592 27 23.7141 27 23.25V12.75C27 11.7788 26.19 11 25.2 11Z"
                      fill="#FFAD47"
                    />
                  </svg>
                </Box>

                <VStack alignItems="flex-start" spacing="3px">
                  <Text fontWeight="500">EmailAddress:</Text>
                  <Text color="gray" fontSize="13px">
                    {currentAccountIdentity != null
                      ? currentAccountIdentity.email
                      : user.email}
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <Box>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#FFE4C2" />
                    <path
                      d="M12.62 16.79C14.06 19.62 16.38 21.94 19.21 23.38L21.41 21.18C21.69 20.9 22.08 20.82 22.43 20.93C23.55 21.3 24.75 21.5 26 21.5C26.2652 21.5 26.5196 21.6054 26.7071 21.7929C26.8946 21.9804 27 22.2348 27 22.5V26C27 26.2652 26.8946 26.5196 26.7071 26.7071C26.5196 26.8946 26.2652 27 26 27C21.4913 27 17.1673 25.2089 13.9792 22.0208C10.7911 18.8327 9 14.5087 9 10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9H13.5C13.7652 9 14.0196 9.10536 14.2071 9.29289C14.3946 9.48043 14.5 9.73478 14.5 10C14.5 11.25 14.7 12.45 15.07 13.57C15.18 13.92 15.1 14.31 14.82 14.59L12.62 16.79Z"
                      fill="#FFAD47"
                    />
                  </svg>
                </Box>

                <VStack alignItems="flex-start" spacing="3px">
                  <Text fontWeight="500">Phone No:</Text>
                  <Text color="gray" fontSize="13px">
                    {currentAccountIdentity != null
                      ? currentAccountIdentity.phone
                      : ""}
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <Box>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#FFE4C2" />
                    <path
                      d="M18 17.5C17.337 17.5 16.7011 17.2366 16.2322 16.7678C15.7634 16.2989 15.5 15.663 15.5 15C15.5 14.337 15.7634 13.7011 16.2322 13.2322C16.7011 12.7634 17.337 12.5 18 12.5C18.663 12.5 19.2989 12.7634 19.7678 13.2322C20.2366 13.7011 20.5 14.337 20.5 15C20.5 15.3283 20.4353 15.6534 20.3097 15.9567C20.1841 16.26 19.9999 16.5356 19.7678 16.7678C19.5356 16.9999 19.26 17.1841 18.9567 17.3097C18.6534 17.4353 18.3283 17.5 18 17.5ZM18 8C16.1435 8 14.363 8.7375 13.0503 10.0503C11.7375 11.363 11 13.1435 11 15C11 20.25 18 28 18 28C18 28 25 20.25 25 15C25 13.1435 24.2625 11.363 22.9497 10.0503C21.637 8.7375 19.8565 8 18 8Z"
                      fill="#FFAD47"
                    />
                  </svg>
                </Box>

                <VStack alignItems="flex-start" spacing="3px">
                  <Text fontWeight="500">Address:</Text>
                  <Text color="gray" fontSize="13px">
                    {currentAccountIdentity != null
                      ? currentAccountIdentity.addressLine1
                      : ""}
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            <Divider orientation="horizontal" w="100%" />
            <VStack mt="4" spacing="20px">
              <Button
                bg="purple.800"
                color="white"
                onClick={() => setModalState(true)}
              >
                Update Profile
              </Button>
              <Button bg="purple.800" color="white">
                Change Password
              </Button>
              <Button bg="purple.800" color="white">
                Update Service Keys
              </Button>
            </VStack>
          </Box>

          <Modal isOpen={modalState} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center">Update Profile</ModalHeader>
              <ModalCloseButton onClick={() => setModalState(false)} />
              <DashboardAlert />
              <ModalBody>
                <VStack mt="3" spacing="15px">
                  <FormControl>
                    <Input
                      type="text"
                      size="lg"
                      className="form-control"
                      id="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      placeholder={
                        user ? user.firstName : "Enter your firstName"
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      type="text"
                      size="lg"
                      className="form-control"
                      id="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      placeholder={user ? user.lastName : "Enter your lastName"}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      type="text"
                      size="lg"
                      className="form-control"
                      id="userName"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                      placeholder={user ? user.userName : "Enter new UserName"}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      disabled={true}
                      type="text"
                      size="lg"
                      className="form-control"
                      id="email"
                      value={user ? user.email : ""}
                      placeholder={user ? user.email : ""}
                    />
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={(e) => {
                    UpdateUserHandler(e);
                  }}
                  isLoading={isLoading}
                  loadingText="Updating..."
                >
                  Update
                </Button>

                <Button variant="ghost" onClick={(e) => setModalState(false)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default RightSidebarWrapper;
