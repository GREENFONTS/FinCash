import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
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
  Link,
  Button,
} from "@chakra-ui/react";
import { ParseTransactions } from "../Utils/Transactions";
import {
  GetAccounts,
  GetAllTransactions,
} from "../redux/features/Users/accounts";
import { AddServiceKeys } from "../redux/features/Users/auth";
import DashboardAlert from "../components/DashboardAlert";
import TableComponent from "../components/TableComponent";
import { dispatch } from "../redux/store";

const Dashboard = () => {
  const { onClose } = useDisclosure();
  const { user, isLoading, token, monoKey } = useSelector(
    (state) => state.auth,
  );
  const { accounts, Transactions, AllTransactions, RecentTransactions } =
    useSelector((state) => state.accounts);
  const [modalState, setModalState] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [creditTrans, setCreditTrans] = useState([]);
  const [debitTrans, setDebitTrans] = useState([]);
  const [transCount, setTransCount] = useState(0);

  useEffect(() => {
    let transactions = JSON.parse(localStorage.getItem("transactions"));
    let allTransactions = JSON.parse(localStorage.getItem("AllTransactions"));
    let recentTransactions = JSON.parse(localStorage.getItem("RecentTransactions"));

    ParseTransactions(transactions, allTransactions, recentTransactions);
  }, []);

  useEffect(() => {
    if (user) {
      const { id } = user;
      dispatch(GetAccounts(id));
    }
  }, [user]);

  const submitKeysHandler = (e) => {
    e.preventDefault();
    const formBody = {
      monoPrivateKey: privateKey,
      monoSecretKey: secretKey,
      UserId: user.id,
      FlutterKey: "",
    };

    dispatch(AddServiceKeys(formBody));
    setModalState(false);
  };

  useEffect(() => {
    if (AllTransactions != null) {
      console.log(AllTransactions.length)
      let end = AllTransactions.length;
      let start = Math.round(end / 2);
      let timer = setInterval(() => {
        start += 1;

        if (start > end) {
          clearInterval(timer);
        } else setTransCount(start);
      }, 1);
    }
  }, [AllTransactions]);

  useEffect(() => {
    if (RecentTransactions) {
      const CreditTrans = RecentTransactions.filter(
        (transaction) => transaction.type == "credit",
      );
      setCreditTrans(CreditTrans.slice(0, 10));
      const DebitTrans = RecentTransactions.filter(
        (transaction) => transaction.type == "debit",
      );
      setDebitTrans(DebitTrans.slice(0, 10));
    }
  }, [RecentTransactions]);

  useEffect(() => {
    if (accounts) {
      if (accounts.length != 0) {
        if (user) {
          const { id } = user;
          if (
            RecentTransactions === null ||
            ([] && AllTransactions === null) ||
            []
          ) {
            dispatch(GetAllTransactions(id));
          }
        }
      }
    }
  }, [accounts]);

  return (
    <Box bg="gray.200" p="5">
      <Box mt="5">
        <Text fontFamily="cursive">
          Hello {user ? user.userName : ""}, Welcome back ????????
        </Text>
        <Text fontSize="35px" fontWeight="bold">
          Your Dashboard Today
        </Text>
      </Box>

      <Box mt="5" fontSize="20px" fontWeight="bold" w="100%">
        <Text mb="5">
          Linked Accounts - {accounts != null ? accounts.length : ""}
        </Text>

        {accounts != null ? (
          <>
            {accounts.length == 0 && monoKey === null ? (
              <>
                <Flex boxShadow={`0px 0px 3px #222`} p="5">
                  <Box w="50%" h="40vh">
                    <Image
                      src="/images/NoData.svg"
                      h="inherit"
                      alt="No
                            Account"
                    />
                  </Box>
                  <Box p="2" w="50%" alignItems="center" alignContent="center">
                    <Text>Let's Link Up your Accounts????</Text>
                    <Text>
                      &emsp; - Create an Account with{" "}
                      <Link
                        href="https://app.mono.co/signup"
                        target="_blank"
                        color="purple.700"
                      >
                        Mono
                      </Link>
                    </Text>
                    <Text>&emsp; - Create an App and set to Live</Text>
                    <Text>&emsp; - Copy the Secret and private keys</Text>

                    <Box mt="5">
                      <Button
                        bg="purple.700"
                        color="white"
                        onClick={() => setModalState(true)}
                      >
                        Store Keys
                      </Button>

                      <Modal isOpen={modalState} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader textAlign="center">
                            Store App Keys
                          </ModalHeader>
                          <ModalCloseButton
                            onClick={() => setModalState(false)}
                          />
                          <DashboardAlert />
                          <ModalBody>
                            <VStack mt="3" spacing="15px">
                              <FormControl>
                                <Input
                                  type="text"
                                  size="lg"
                                  className="form-control"
                                  id="Mono_private_key"
                                  onChange={(e) =>
                                    setPrivateKey(e.target.value)
                                  }
                                  value={privateKey}
                                  placeholder="Enter your Mono App Private_key"
                                />
                              </FormControl>
                              <FormControl>
                                <Input
                                  type="text"
                                  size="lg"
                                  className="form-control"
                                  id="Mono_secret_key"
                                  onChange={(e) => setSecretKey(e.target.value)}
                                  value={secretKey}
                                  placeholder="Enter your Mono App Secret_key"
                                />
                              </FormControl>
                            </VStack>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme="blue"
                              mr={3}
                              onClick={(e) => {
                                submitKeysHandler(e);
                              }}
                              isLoading={isLoading}
                              loadingText="Submitting..."
                            >
                              Submit
                            </Button>

                            <Button
                              variant="ghost"
                              onClick={(e) => setModalState(false)}
                            >
                              Close
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Box>
                  </Box>
                </Flex>
              </>
            ) : (
              <>
                <Flex justifyContent="space-between">
                  <Box m="5" align="center">
                    <Flex
                      textAlign="center"
                      color="purple.700"
                      fontSize="30px"
                      boxShadow="base"
                      borderRadius="50%"
                      w="200px"
                      bg="white"
                      lineHeight="200px"
                    >
                      <Text m="auto">{accounts.length}</Text>
                    </Flex>
                    <Text mt="3">Linked Accounts</Text>
                  </Box>

                  <Box m="5" align="center">
                    <Flex
                      textAlign="center"
                      color="purple.700"
                      fontSize="30px"
                      boxShadow="base"
                      borderRadius="50%"
                      w="200px"
                      bg="white"
                      lineHeight="200px"
                    >
                      <Text m="auto">{transCount}</Text>
                    </Flex>
                    <Text mt="3">Transactions</Text>
                  </Box>

                  <Box m="5" align="center">
                    <Flex
                      textAlign="center"
                      color="purple.700"
                      fontSize="30px"
                      boxShadow="base"
                      borderRadius="50%"
                      w="200px"
                      bg="white"
                      lineHeight="200px"
                    >
                      <Text m="auto">65</Text>
                    </Flex>
                    <Text mt="3">Bill Payments</Text>
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
        <Box align="center" mb="5" w="80%">
          <Text fontSize="25px" fontWeight="bold">
            Recent Transactions
          </Text>
        </Box>

        <Box bg="white" borderRadius="8" p="5" w="80%">
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
    </Box>
  );
};

export default Dashboard;
