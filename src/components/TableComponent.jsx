import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader
} from "@chakra-ui/react";
import { useState } from "react";

const TableComponent = ({ transactions }) => {
  const [narration, setNarration] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th w="60%">Description</Th>
            <Th w="20%">Amount(N)</Th>
            <Th w="20%">Date</Th>
          </Tr>
        </Thead>

        {transactions.length > 0 ? (
          <Tbody>
            {transactions.map((trans) => {
              return (
                <Tr key={trans._id} w="100%">
                  <Td className="tableWidth" fontSize="13px" onClick={() => {
                    onOpen();
                    setNarration(trans.narration)
                  }}>
                      {trans.narration.slice(0, 100)}
                  </Td>

                  <Td>{trans.amount / 100}</Td>
                  <Td>{trans.date.split("T")[0]}</Td>

                  
                </Tr>
              );
            })}
          </Tbody>
        ) : (
          <></>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Narration</ModalHeader>
                <ModalBody>
                   {narration}
                </ModalBody>
                
            </ModalContent>
        </Modal>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
