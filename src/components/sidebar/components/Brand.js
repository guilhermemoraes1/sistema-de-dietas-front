import React from "react";

// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Text
        fontSize="25"
        fontWeight="bold"
        color={logoColor}
        mb="12px"
        textAlign="center"
      >
        Sistema de Dietas
      </Text>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
