import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/features/Users/auth";

const AlertComponent = () => {
  const dispatch = useDispatch();
  const {error} = useSelector((state) => state.auth)
  const { onClose} = useDisclosure({ defaultIsOpen: true });

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
              dispatch(reset());
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

export default AlertComponent;
