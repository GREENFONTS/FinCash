import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    CloseButton,
    useDisclosure,
  } from "@chakra-ui/react";
  
  import {useSelector } from "react-redux";
  
  const DashboardAlert = () => {
    const {error} = useSelector((state) => state.auth)
    const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  
    return (
      <>
        {error ? (
          <Alert isOpen={error ? true : false} status="error">
            <AlertIcon />
            <Box>
              <AlertDescription>
                {error ? error : "Request Error"}
              </AlertDescription>
            </Box>
  
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => {
                onClose();
              }}
            ></CloseButton>
          </Alert>
        ) : (
          <></>
        )}
      </>
    );
  };
  
  export default DashboardAlert;
  