import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import DietaTable from "./components/DietaTable";

export default function Settings() {
  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <DietaTable />
        </SimpleGrid>
      </Box>      
    </>
  );
}
