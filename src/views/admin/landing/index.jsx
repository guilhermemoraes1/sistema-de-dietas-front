import { Box } from "@chakra-ui/react";
import React from "react";

import LandingPage from "./components/LandingPage";

export default function Settings() {
  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <LandingPage />
      </Box>      
    </>
  );
}
