import { Box, Center, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex w="100%" h="100%" flexDir="column">
      <Header />
      <Flex h="95vh" w="100vw">
        {children}
      </Flex>
    </Flex>
  );
}
