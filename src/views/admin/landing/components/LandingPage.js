import { Box, Container, VStack } from '@chakra-ui/react';
import Hero from './Hero';
import AboutSection from './AboutSection';
import DevSection from './DevSection';

export default function LandingPage() {
  return (
      <Container maxW="6xl" px={{ base: 4, md: 6 }}>
        <VStack spacing={12}>
          <Hero />
          <AboutSection />
          <DevSection />
        </VStack>
      </Container>
  );
}
