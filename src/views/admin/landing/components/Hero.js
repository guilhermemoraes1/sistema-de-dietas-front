import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export default function Hero() {
  return (
    <VStack spacing={3}>
      <Heading
        fontSize={{ base: '3xl', md: '5xl' }}
        bgGradient="linear(to-r, purple.500, blue.400)"
        bgClip="text"
        fontWeight="extrabold"
        textAlign="center"
      >
        Sistema de Dietas
      </Heading>
      <Text fontSize="lg" color="gray.600" maxW="3xl" textAlign="center">
        Este projeto facilita o gerenciamento de dietas personalizadas,
        conectando nutricionistas e pacientes com uma interface moderna e intuitiva.
      </Text>
    </VStack>
  );
}
