import { Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export default function Hero() {
  const textColor = useColorModeValue('gray.600', 'gray.300');

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
      <Text fontSize="lg" color={textColor} maxW="3xl" textAlign="center">
        Este projeto facilita o gerenciamento de dietas personalizadas,
        conectando nutricionistas e pacientes com uma interface moderna e intuitiva.
      </Text>
    </VStack>
  );
}
