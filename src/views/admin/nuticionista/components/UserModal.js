import { Avatar, Box, HStack, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

export default function UserModal({ usuarios, isOpen, onClose, nutricionista }) {
  return (
    <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="lg"
        scrollBehavior ={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pacientes de {nutricionista}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {usuarios.length > 0 ? (
            <List spacing={3}>
              {usuarios.map((usuario) => (
                <ListItem key={usuario.id} p={2} borderRadius="md" _hover={{ bg: 'gray.50' }}>
                  <HStack>
                    <Avatar size="sm" name={usuario.nome} />
                    <Box>
                      <Text fontWeight="medium">{usuario.nome}</Text>
                      <Text fontSize="sm" color="gray.600">{usuario.email}</Text>
                    </Box>
                  </HStack>
                </ListItem>
              ))}
            </List>
          ) : (
            <Text color="gray.500" textAlign="center" py={4}>
              Nenhum paciente vinculado
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}