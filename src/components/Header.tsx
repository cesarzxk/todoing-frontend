import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";

export default function Header() {
  return (
    <Flex
      w="100%"
      h="5vh"
      bgColor="#0F0F36"
      px="2rem"
      alignItems="center"
      gap="1rem"
    >
      <Image src="logo.png" h="44px" alt="diel-logo" />
      <Text fontSize="25px" fontWeight="black" color="white">
        To-doing
      </Text>
      <Spacer />
    </Flex>
  );
}
