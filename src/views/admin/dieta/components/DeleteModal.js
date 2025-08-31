import { Box, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";

export default function DeleteModal({  isOpen, onClose, handleDelete,text}) {

  return (
    <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="lg"
        scrollBehavior ={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{text}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
            <Box mt={4}>
                <HStack spacing={10}> 
                    <Button 
                        colorScheme="teal"
                        onClick={() => {
                            handleDelete(); 
                            onClose();
                        }}
                        >
                    Aceitar
                    </Button>

                    <Button 
                        colorScheme="red" 
                        type="button"
                        onClick={onClose}>
                    Cancelar
                    </Button>
                </HStack>
            </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}