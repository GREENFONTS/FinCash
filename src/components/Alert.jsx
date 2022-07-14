import { reset } from "../redux/features/Users/auth";
import {Alert, AlertDescription, AlertIcon, Box,  CloseButton, useDisclosure} from "@chakra-ui/react"

const AlertComponent = ({error, dispatch}) => {
const {isOpen, onClose, onOpen} = useDisclosure({defaultIsOpen: true})
  
    return (
      <>
      {error ? (
            <Alert isOpen={error ? true : false} status="error">
              <AlertIcon />
              <Box><AlertDescription>{error ? error : "Request Error"}</AlertDescription></Box>
              
              <CloseButton
              position='absolute' right='8px' top='8px'
                onClick={() =>{
                  dispatch(reset())
                  onClose()
                } }
              ></CloseButton>
            </Alert>

    ) : <></>}
    </>
    )
}

export default AlertComponent;