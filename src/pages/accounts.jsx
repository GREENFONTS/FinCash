import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loader";
import {
  GetAccounts,
  AddAccount,
  GetAccountId,
  GetAccountTransactions,
  UpdateAccount,
  UnlinkAccount,
} from "../redux/features/Users/accounts";
import { AccessRoute } from "../Utils/RouteAuth";
import MonoConnect from "@mono.co/connect.js";

import {
  HStack,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  Icon,
  Flex,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  Box,
  Text,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  VStack,
  FormControl,
  Input,
  Image,
  Button,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import DashboardAlert from "../components/DashboardAlert";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";

const Accounts = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { onClose } = useDisclosure();
  const { user, token, monoKey, authenticated } = useSelector(
    (state) => state.auth,
  );
  const { accounts, isAcctLoading, Transactions } = useSelector(
    (state) => state.accounts,
  );
  const [modalState, setModalState] = useState(false);
  const [BranchName, setBranchName] = useState("");
  const [BranchAddress, setBranchAddress] = useState("");
  const [BranchDescription, setBranchDescription] = useState("");
  const [BranchId, setBranchId] = useState();
  const [creditTrans, setCreditTrans] = useState([]);
  const [debitTrans, setDebitTrans] = useState([]);
  const [code, setCode] = useState("");
  const [accountId, setAccountId] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    let expiryDate = localStorage.getItem("tokenExpiryDate");
    let monoKey = localStorage.getItem("monoKey");
    let transactions = localStorage.getItem("transactions");
    let allTransactions = localStorage.getItem("AllTransactions");
    let recentTransactions = localStorage.getItem("RecentTransactions");

    AccessRoute(
      token,
      user,
      expiryDate,
      monoKey,
      transactions,
      allTransactions,
      recentTransactions,
      dispatch,
    );
    const { id } = JSON.parse(user);

    const Data = {
      token,
      id: id,
    };
    dispatch(GetAccounts(Data));
  }, []);

  const monoConnect = useMemo(() => {
    if (monoKey != null) {
      const monoInstance = new MonoConnect({
        onClose: () => console.log("Widget closed"),
        onLoad: () => console.log("Widget loaded successfully"),
        onSuccess: ({ code }) => {
          setCode(code);
        },

        key: monoKey,
      });

      monoInstance.setup();

      return monoInstance;
    }
  }, [monoKey]);

  useEffect(() => {
    const Data = {
      code,
      BranchId,
      token,
    };
    if (code != "") {
      dispatch(GetAccountId(Data));
    }
  }, [code]);

  const submitBranchHandler = (e) => {
    e.preventDefault();

    const formBody = {
      BranchId: "",
      BranchName,
      Address: BranchAddress,
      Description: BranchDescription,
      UserId: user.id,
      AccountId: "",
    };

    dispatch(AddAccount({ formBody, token }));
    if (!isAcctLoading) {
      const Data = {
        token,
        id: user.id,
      };
      dispatch(GetAccounts(Data));
      setModalState(false);
    }
  };

  const GetTransactionsHandler = (account) => {
    const Data = {
      token,
      branchId: account.branchId,
    };
    dispatch(GetAccountTransactions(Data));
  };

  useEffect(() => {
    if (Transactions) {
      localStorage.setItem("transactions", JSON.stringify(Transactions));
      const CreditTrans = Transactions.filter(
        (transaction) => transaction.type == "credit",
      );
      setCreditTrans(CreditTrans);
      const DebitTrans = Transactions.filter(
        (transaction) => transaction.type == "debit",
      );
      setDebitTrans(DebitTrans);
    }
  }, [Transactions]);

  const onUpdateHandler = () => {
    const formBody = {
      BranchId: BranchId,
      BranchName,
      Address: BranchAddress,
      Description: BranchDescription,
      UserId: user.id,
      AccountId: accountId,
    };
    const Data = {
      formBody,
      token,
    };
    dispatch(UpdateAccount(Data));

    if (!isAcctLoading) {
      const Data = {
        token,
        id: user.id,
      };
      dispatch(GetAccounts(Data));
      setModalState(false);
    }
  };

  const DeleteHandler = () => {
    const Data = {
      token,
      BranchId,
    };
   
    dispatch(UnlinkAccount(Data));
    if(!isAcctLoading){
      const Data = {
        token,
        id: user.id,
      };
      dispatch(GetAccounts(Data));
      setDeleteModal(false) 
       }
  };

  return (
    <>
      {" "}
      {!user || !authenticated ? (
        <Loading />
      ) : (
        <>
          <Box bg="gray.100" p="5" mb="5">
            <Box mt="5">
              <Text fontFamily="cursive">
                Hello {user ? user.userName : ""}, Welcome back 👋🏻
              </Text>
              <Text fontSize="35px" fontWeight="bold">
                Your Accounts Today
              </Text>
            </Box>

            <Box mt="5" fontSize="20px" fontWeight="bold" w="100%">
              <Text mb="5">
                Linked Accounts - {accounts != null ? accounts.length : ""}
              </Text>
              {accounts != null ? (
                <>
                  {accounts.length == 0 ? (
                    <>
                      <Flex boxShadow={`0px 0px 3px #222`} p="4">
                        <Box w="50%" h="40vh">
                          <Image
                            src="/images/NoData.svg"
                            h="inherit"
                            alt="No
                            Account"
                          />
                        </Box>
                        <Flex
                          p="2"
                          w="50%"
                          alignItems="center"
                          alignContent="center"
                        >
                          <Box align="center">
                            <Text mb="5">Let's Link Up your Accounts😋</Text>
                            <Button
                              bg="purple.700"
                              color="white"
                              onClick={() => setModalState(true)}
                            >
                              Create an Account Branch
                            </Button>
                          </Box>
                        </Flex>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Flex justifyContent="space-between" flexWrap="wrap">
                        {accounts.map((account) => {
                          return (
                            <Box key={account.branchId}>
                              {account.accountId === "" ? (
                                <>
                                  <Box
                                    position="relative"
                                    onClick={() => nav("/dashboard/accounts")}
                                    bg="white"
                                    borderRadius="7px"
                                    textColor="black"
                                    boxShadow="base"
                                    width="250px"
                                    h="20vh"
                                    p="3"
                                  >
                                    <Text>{account.branchName}</Text>
                                    <Box
                                      position="absolute"
                                      bottom="0"
                                      right="0"
                                      p="2"
                                    >
                                      <Button
                                        bg="#182CD1"
                                        opacity="0.9"
                                        color="white"
                                        borderRadius="8px"
                                        h="50px"
                                        w="200px"
                                        onClick={() => {
                                          setBranchId(account.branchId);
                                          monoConnect.open();
                                        }}
                                      >
                                        <Image
                                          src="/images/mono.png"
                                          w="inherit"
                                          h="inherit"
                                        />
                                        <Divider
                                          orientation="vertical"
                                          colorScheme="#FFFFFF"
                                        />
                                        Connect To Mono
                                      </Button>
                                    </Box>
                                  </Box>
                                </>
                              ) : (
                                <Box
                                  bg="purple.800"
                                  borderRadius="7px"
                                  _hover={{
                                    transform: "scale(1.05)",
                                    cursor: "pointer",
                                  }}
                                  textColor="white"
                                  boxShadow="base"
                                  width="-moz-fit-content"
                                  h="8vh"
                                  p="3"
                                >
                                  <Flex justifyContent="space-between">
                                    <Text
                                      onClick={() =>
                                        GetTransactionsHandler(account)
                                      }
                                    >
                                      {account.branchName}
                                    </Text>
                                    <HStack ml="4" spacing="3px">
                                      <Icon
                                        as={FaEdit}
                                        onClick={() => {
                                          setBranchId(account.branchId);
                                          setBranchAddress(account.address);
                                          setBranchDescription(
                                            account.description,
                                          );
                                          setBranchName(account.branchName);
                                          setAccountId(account.accountId);
                                          setUpdateModal(true);
                                          setModalState(true);
                                        }}
                                      />

                                      <Icon
                                        as={FaTrash}
                                        onClick={() => {
                                          setBranchId(account.branchId);
                                          setDeleteModal(true);
                                        }}
                                      />
                                    </HStack>
                                  </Flex>
                                </Box>
                              )}
                            </Box>
                          );
                        })}
                        <Box p="2">
                          <Button
                            bg="purple.800"
                            onClick={() => setModalState(true)}
                            borderRadius="9px"
                            _hover={{
                              transform: "scale(1.05)",
                              cursor: "pointer",
                            }}
                            textColor="white"
                            boxShadow="base"
                            width="-moz-fit-content"
                            h="8vh"
                            p="3"
                          >
                            Add new Account
                          </Button>
                        </Box>
                      </Flex>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
              <Flex></Flex>
            </Box>

            <Box mt="5">
              <Box align="center" mb="5" w="100%">
                <Text fontSize="25px" fontWeight="bold">
                  Account Transactions
                </Text>
              </Box>

              <Box bg="white" borderRadius="8" boxShadow="base" p="5" w="100%">
                <Tabs variant="unstyled">
                  <TabList>
                    <Tab
                      bg="white.200"
                      w="50%"
                      fontSize="17px"
                      fontWeight="600"
                      _selected={{
                        color: "black",
                        borderRadius: "7px",
                        boxShadow: "base",
                        bg: "gray.200",
                      }}
                    >
                      Credit
                    </Tab>
                    <Tab
                      bg="white.200"
                      w="50%"
                      fontSize="17px"
                      fontWeight="600"
                      _selected={{
                        color: "black",
                        borderRadius: "7px",
                        boxShadow: "base",
                        bg: "gray.200",
                      }}
                    >
                      Debit
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <TableComponent transactions={creditTrans} />
                    </TabPanel>

                    <TabPanel>
                      <TableComponent transactions={debitTrans} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>

            <Modal isOpen={modalState} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign="center">
                  Create Account Branch
                </ModalHeader>
                <ModalCloseButton onClick={() => setModalState(false)} />
                <DashboardAlert />
                <ModalBody>
                  <VStack mt="3" spacing="15px">
                    <FormControl>
                      <Input
                        type="text"
                        size="lg"
                        className="form-control"
                        id="BranchName"
                        onChange={(e) => setBranchName(e.target.value)}
                        value={BranchName}
                        placeholder="Enter Account / Branch Name"
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        type="text"
                        size="lg"
                        className="form-control"
                        id="BranchAddress"
                        onChange={(e) => setBranchAddress(e.target.value)}
                        value={BranchAddress}
                        placeholder="Enter Account Bank / Branch Address"
                      />
                    </FormControl>

                    <FormControl>
                      <Textarea
                        type="text"
                        rows="5"
                        className="form-control"
                        id="BranchDescription"
                        onChange={(e) => setBranchDescription(e.target.value)}
                        value={BranchDescription}
                        placeholder="Enter Account/Branch Description"
                      ></Textarea>
                    </FormControl>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={(e) => {
                      updateModal ? onUpdateHandler(e) : submitBranchHandler(e);
                    }}
                    isLoading={isAcctLoading}
                    loadingText={updateModal ? "Updating..." : "Submitting..."}
                  >
                    Submit
                  </Button>

                  <Button variant="ghost" onClick={(e) => setModalState(false)}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal isOpen={deleteModal} onClose={onClose}>
              <ModalContent>
                <ModalHeader textAlign="center">Delete Acoount</ModalHeader>
                <ModalBody>
                  <Text>This action will Unlink this account</Text>
                  <Text> Do you sure you want to unlink this account?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="red"
                    mr={3}
                    onClick={(e) => {
                      DeleteHandler();
                    }}
                    isLoading={isAcctLoading}
                    loadingText="Deleting..."
                  >
                    Delete
                  </Button>

                  <Button variant="ghost" onClick={(e) => setDeleteModal(false)}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </>
      )}
    </>
  );
};

export default Accounts;
