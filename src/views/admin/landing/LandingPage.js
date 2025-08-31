import { Box, Container, VStack } from '@chakra-ui/react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import DevSection from './components/DevSection';

export default function LandingPage() {
  return (
    <Box bgGradient="linear(to-br, gray.50, white)" minH="100vh" py={10} pt="90px">

      <Container maxW="6xl" px={{ base: 4, md: 6 }}>
        <VStack spacing={12}>
          <Hero />
          <AboutSection />
          <DevSection />
        </VStack>
      </Container>
    </Box>
  );
}
