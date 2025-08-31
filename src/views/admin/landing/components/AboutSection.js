import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export default function AboutSection() {
  return (
    <Box
      bg="white"
      p={6}
      rounded="lg"
      shadow="md"
      w="full"
    >
      <Heading fontSize="2xl" mb={2} color="gray.800">
        Sobre o Projeto
      </Heading>
      <Text fontSize="md" color="gray.600">
        A plataforma permite cadastrar, listar, editar e remover Dietas e Usuários.
      </Text>
    </Box>
  );
}
