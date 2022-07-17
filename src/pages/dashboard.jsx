import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  useStatStyles,
  HStack,
} from "@chakra-ui/react";
import Loading from "../components/Loader";
import { AccessRoute } from "../Utils/RouteAuth";
import { GetAccounts } from "../redux/features/Users/accounts";
import { AddServiceKeys } from "../redux/features/Users/auth";
import DashboardAlert from "../components/DashboardAlert";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isLoading, token, monoKey, error } = useSelector(
    (state) => state.auth,
  );
  const { accounts, Transactions } = useSelector((state) => state.accounts);
  const [modalState, setModalState] = useState(false);
  const [userId, setUserId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    let expiryDate = localStorage.getItem("tokenExpiryDate");
    let monoKey = localStorage.getItem("monoKey");

    AccessRoute(token, user, expiryDate, monoKey, Transactions, dispatch);
    const { id } = JSON.parse(user);
    const Data = {
      token,
      id: id,
    };
    dispatch(GetAccounts(Data));
  }, []);

  const submitKeysHandler = (e) => {
    e.preventDefault();

    const formBody = {
      monoPrivateKey: privateKey,
      monoSecretKey: secretKey,
      UserId: user.id,
      FlutterKey: "",
    };

    dispatch(AddServiceKeys({ formBody, token }));
    if (!monoKey) {
      localStorage.setItem("monoKey", monoKey);
      setModalState(false);
    }
  };

  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <>
          <Box bg="gray.200" p="5" mb="5">
            <Box mt="5">
              <Text fontFamily="cursive">
                Hello {user ? user.userName : ""}, Welcome back 👋🏻
              </Text>
              <Text fontSize="35px" fontWeight="bold">
                Your Dashboard Today
              </Text>
            </Box>

            <Box mt="5" fontSize="20px" fontWeight="bold" w="80%">
              <Text mb="5">
                Linked Accounts - {accounts != null ? accounts.length : ""}
              </Text>

              {accounts != null ? (
                <>
                  {accounts.length == 0 ? (
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
                        <Box
                          p="2"
                          w="50%"
                          alignItems="center"
                          alignContent="center"
                        >
                          <Text>Let's Link Up your Accounts😋</Text>
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
                                        onChange={(e) =>
                                          setSecretKey(e.target.value)
                                        }
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
                            <Text m="auto">N353456665</Text>
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
                      <Box>
                        <Flex
                          justifyContent="space-between"
                          p="5"
                          fontSize="17px"
                          fontWeight="600"
                        >
                          <Text>Description</Text>
                          <Text>Amount(N)</Text>
                          <Text>Date</Text>
                        </Flex>
                      </Box>
                    </TabPanel>

                    <TabPanel>
                      <Box>
                        <Flex
                          justifyContent="space-between"
                          p="5"
                          fontSize="17px"
                          fontWeight="600"
                        >
                          <Text>Description</Text>
                          <Text>Amount(N)</Text>
                          <Text>Date</Text>
                        </Flex>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
