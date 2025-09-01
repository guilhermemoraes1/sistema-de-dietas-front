import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

export default function AboutSection() {
  const cardBg = useColorModeValue('white', 'navy.700'); // mesma cor escura usada em Card
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
      w="full"
    >
      <Heading fontSize="2xl" mb={2} color={headingColor}>
        Sobre o Projeto
      </Heading>
      <Text fontSize="md" color={textColor}>
        A plataforma permite cadastrar, listar, editar e remover Dietas e Usuários.
      </Text>
    </Box>
  );
}
