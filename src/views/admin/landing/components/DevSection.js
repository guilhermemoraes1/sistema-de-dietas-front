import {
  Avatar,
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import devList from '../variables/devList';

export default function DevSection() {
  const cardBg = useColorModeValue('white', 'navy.700'); // mesma cor escura usada em Card
  const headingColor = useColorModeValue('gray.800', 'gray.100');
  const roleColor = useColorModeValue('gray.500', 'gray.300');
  
  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
      w="full"
    >
      <Heading fontSize="2xl" mb={6} color={headingColor}>Desenvolvedores</Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {devList.map((dev, index) => (
          <VStack key={index}>
            <Avatar
              name={dev.name}
              src={dev.avatar}
              size="2xl"
              border="3px solid"
              borderColor="blue.300"
              _hover={{ transform: 'scale(1.05)', transition: '0.3s ease' }}
            />
            <Text fontWeight="bold" fontSize="lg" color={headingColor}>
              {dev.name}
            </Text>
            <Text fontSize="sm" color={roleColor}>{dev.role}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
